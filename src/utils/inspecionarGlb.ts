// Lê um arquivo .glb local e extrai informações básicas (altura do modelo e
// nomes das animações embutidas) para calcularmos uma escala inicial razoável
// quando o usuário importa seu próprio modelo.

export type InfoGlb = {
  alturaY: number | null;
  animacoes: string[];
};

function lerAccessorMinMax(json: any, buffer: ArrayBuffer, binInicio: number, accessorIndex: number) {
  const acessor = json.accessors[accessorIndex];
  if (acessor.min && acessor.max && acessor.min.length === 3) {
    return { min: acessor.min as number[], max: acessor.max as number[] };
  }

  const bufferView = json.bufferViews[acessor.bufferView];
  const stride = bufferView.byteStride || 12;
  const offset = binInicio + (bufferView.byteOffset || 0) + (acessor.byteOffset || 0);
  const view = new DataView(buffer);
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (let i = 0; i < acessor.count; i++) {
    const base = offset + i * stride;
    for (let c = 0; c < 3; c++) {
      const valor = view.getFloat32(base + c * 4, true);
      if (valor < min[c]) min[c] = valor;
      if (valor > max[c]) max[c] = valor;
    }
  }
  return { min, max };
}

export async function inspecionarGlb(uri: string): Promise<InfoGlb> {
  const resposta = await fetch(uri);
  const buffer = await resposta.arrayBuffer();
  const view = new DataView(buffer);

  const magic = view.getUint32(0, true);
  if (magic !== 0x46546c67) {
    // Não é um glTF binário válido (assinatura "glTF" em little-endian)
    return { alturaY: null, animacoes: [] };
  }

  const jsonLen = view.getUint32(12, true);
  const jsonBytes = new Uint8Array(buffer, 20, jsonLen);
  const jsonTexto = new TextDecoder("utf-8").decode(jsonBytes);
  const json = JSON.parse(jsonTexto);
  const binInicio = 20 + jsonLen + 8;

  const animacoes: string[] = (json.animations || [])
    .map((a: any, i: number) => a.name || `animacao_${i}`);

  let minAll = [Infinity, Infinity, Infinity];
  let maxAll = [-Infinity, -Infinity, -Infinity];
  let encontrouPosicao = false;

  try {
    for (const mesh of json.meshes || []) {
      for (const primitiva of mesh.primitives || []) {
        const posIdx = primitiva.attributes?.POSITION;
        if (posIdx === undefined) continue;
        const { min, max } = lerAccessorMinMax(json, buffer, binInicio, posIdx);
        encontrouPosicao = true;
        for (let c = 0; c < 3; c++) {
          if (min[c] < minAll[c]) minAll[c] = min[c];
          if (max[c] > maxAll[c]) maxAll[c] = max[c];
        }
      }
    }
  } catch {
    encontrouPosicao = false;
  }

  if (!encontrouPosicao) {
    return { alturaY: null, animacoes };
  }

  const alturaY = maxAll[1] - minAll[1];
  return { alturaY: alturaY > 0 ? alturaY : null, animacoes };
}
