# Sock Manager 📦

Um aplicativo mobile de gerenciamento de estoque, desenvolvido em **React Native com Expo** e integração com **Firebase Realtime Database**.

---

## ✅ Funcionalidades Principais

- **Autenticação de Usuário (Firebase Auth)**  
  Login, cadastro, recuperação de senha com envio de email automático.

- **Cadastro de Produtos**  
  Inclui nome, descrição, código, referência, categoria, marca, peso, dimensões, quantidade, preço de custo e preço de venda.  
  Suporte a **upload de imagens via câmera**.

- **Listagem de Produtos**  
  Exibe todos os produtos com busca por **nome**, **código** ou **descrição**, com **autocomplete** em tempo real.  
  Modal de detalhes por produto com opção de edição.

- **Movimentações de Estoque (Entradas e Saídas)**  
  Registro de movimentações com seleção rápida de produto, quantidade, tipo de operação e data.  
  Atualização automática do saldo de estoque após cada movimentação.

- **Tela Inicial com Resumo Inteligente**  
  Mostra os **produtos com estoque zerado**, **estoque negativo** ou **baixo estoque (menor que 3)**.  
  Inclui também as **movimentações mais recentes**.

- **Controle de Splash Screen e Ícone Personalizado**  
  Splash screen e ícone próprios configurados com Expo.

- **Proteção de API via Restrição por SHA-1 e Nome de Pacote**  
  Firebase protegido contra acesso externo indevido.

- **Ajuda Rápida**  
  Ícone de interrogação disponível em todas as telas, com alerta de contato via **WhatsApp** ou **E-mail** para suporte.

---

## ✅ Tecnologias Utilizadas

- **React Native (Expo Router)**  
- **Firebase Realtime Database**  
- **Firebase Authentication**  
- **EAS Build**  
- **Expo Splash Screen**  
- **Expo Image Picker / Camera**  
- **Expo Vector Icons**  

---

## ✅ Peculiaridades e Diferenciais

- **Autocomplete ao buscar produtos** com destaque em negrito nas partes correspondentes.  
- **Máscaras de valores** (preços, peso, dimensões) com persistência limpa (sem formatação) no Firebase.  
- **Cálculo automático da margem de lucro %** na tela de cadastro de produtos.  
- **Prevenção de builds futuras com appVersionSource `"local"` no EAS.**  
- **Tratamento de erros detalhado nas autenticações Firebase.**  
- **Armazenamento da splash screen e ícone local para build via EAS.**

---

## ✅ Fontes de Apoio e Consulta

- ChatGPT (OpenAI) para auxílio nas soluções de UX, integrações Firebase e EAS Build.  
- StackOverflow – Resolução de conflito de autenticação com Expo/Firebase Auth:  
https://stackoverflow.com/questions/79602687/react-native-expo-firebase-auth-component-auth-has-not-been-registered-yet/79603601#79603601

---

## ✅ Build e Publicação

```bash
eas build -p android --profile production
