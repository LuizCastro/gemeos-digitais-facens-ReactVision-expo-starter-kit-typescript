import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, SafeAreaViewBase, StatusBar, StyleSheet, Text, View } from "react-native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import CenaImagem from "../src/scenes/CenaImagem";
import CenaPlano from "../src/scenes/CenaPlano";
import CenaInterativa from "../src/scenes/CenaInterativa";
import CenaPlanoInterativa from "../src/scenes/CenaPlanoInterativa";
import CenaCatalogoAR from "../src/scenes/CenaCatalogoAR";
import CenaCarroNaCapa from "../src/scenes/CenaCarroNaCapa";

type TelaAR =
  | "imagem"
  | "plano"
  | "interativo"
  | "planoInterativo"
  | "catalogo"
  | "carroNaCapa"
  | null;

type ObjetoCatalogo = "cubo" | "esfera" | "placa";

export default function App() {
  const [telaAtual, setTelaAtual] = useState<TelaAR>(null);
  const [objetoSelecionado, setObjetoSelecionado] = useState<ObjetoCatalogo>("cubo");

  const cenaSelecionada = useMemo(() => {
    if (telaAtual === "imagem") { return CenaImagem; }
    if (telaAtual === "plano") { return CenaPlano; }
    if (telaAtual === "interativo") { return CenaInterativa; }
    if (telaAtual === "planoInterativo") { return CenaPlanoInterativa; }
    if (telaAtual === "catalogo") { return CenaCatalogoAR; }
    if (telaAtual === "carroNaCapa") { return CenaCarroNaCapa; }
    return null;
  }, [telaAtual]);

  if (cenaSelecionada) {
    return (
      <View style={styles.arContainer}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: cenaSelecionada as any }}
          viroAppProps={{ objetoSelecionado }}
          style={styles.arContainer}
        />

        <SafeAreaView style={styles.overlay}>
          <Pressable
            style={styles.voltarButton}
            onPress={() => setTelaAtual(null)}
          >
            <Text style={styles.voltarButtonText}>Voltar</Text>
          </Pressable>
          
          {telaAtual === "catalogo" && (
            <View style={styles.catalogoOverlay}>
              <Text style={styles.catalogoTitulo}>Escolha o objeto:</Text>
              <View style={styles.catalogoBotoes}>

                <BotaoObjeto
                  titulo="Cubo"
                  ativo={objetoSelecionado === "cubo"}
                  onPress={() => setObjetoSelecionado("cubo")}
                />
                
                <BotaoObjeto
                  titulo="Esfera"
                  ativo={objetoSelecionado === "esfera"}
                  onPress={() => setObjetoSelecionado("esfera")}
                />
                
                <BotaoObjeto
                  titulo="Placa"
                  ativo={objetoSelecionado === "placa"}
                  onPress={() => setObjetoSelecionado("placa")}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
 
      <Text style={styles.title}>App de Realidade Aumentada</Text>
 
      <Text style={styles.subtitle}>Escolha uma experiência:</Text>
 
      <Pressable style={styles.button} onPress={() => setTelaAtual("imagem")}>
        <Text style={styles.buttonTitle}>1. Reconhecer capa ou figura</Text>
        <Text style={styles.buttonDescription}>
          Identifica uma imagem cadastrada e renderiza um objeto 3D acima dela.
        </Text>
      </Pressable>
 
      <Pressable style={styles.button} onPress={() => setTelaAtual("plano")}>
        <Text style={styles.buttonTitle}>2. Usar superfície plana</Text>
        <Text style={styles.buttonDescription}>
          Detecta uma mesa, chão ou parede e posiciona um objeto na superfície.
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => setTelaAtual("interativo")}
      >
        <Text style={styles.buttonTitle}>3. Objeto interativo na imagem</Text>
        <Text style={styles.buttonDescription}>
          Reconhece uma imagem e permite tocar no objeto para alterar sua cor.
        </Text>
      </Pressable>
 
      <Pressable
        style={styles.button}
        onPress={() => setTelaAtual("planoInterativo")}
      >
        <Text style={styles.buttonTitle}>4. Objeto interativo no plano</Text>
        <Text style={styles.buttonDescription}>
          Detecta uma superfície plana e permite tocar no objeto para alterar sua cor.
        </Text>
      </Pressable>

       <Pressable
        style={styles.button}
        onPress={() => setTelaAtual("catalogo")}
      >
        <Text style={styles.buttonTitle}>5. Catálogo AR no plano</Text>
        <Text style={styles.buttonDescription}>
          Escolha entre cubo, esfera ou placa e posicione o objeto em uma superfície.
        </Text>
      </Pressable>
 
      <Pressable
        style={styles.button}
        onPress={() => setTelaAtual("carroNaCapa")}
      >
        <Text style={styles.buttonTitle}>6. Porsche na capa do livro</Text>
        <Text style={styles.buttonDescription}>
          Reconhece a capa cadastrada e renderiza um carro 3D sobre ela.
        </Text>
      </Pressable>
 
    </SafeAreaView>
  );
}

function BotaoObjeto({  titulo,   ativo,  onPress }:
  { titulo: string;  ativo: boolean;  onPress: () => void;}) {
  return (
    <Pressable
      style={[ styles.botaoObjeto,  ativo ? styles.botaoObjetoAtivo : styles.botaoObjetoInativo]}
      onPress={onPress}
    >
      <Text style={[ styles.botaoObjetoTexto, ativo ? styles.botaoObjetoTextoAtivo : styles.botaoObjetoTextoInativo]}>
        {titulo}
      </Text>
    </Pressable>
  );
}
