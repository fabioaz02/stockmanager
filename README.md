
# 📱 Estoque Manager – App de Controle de Estoque

## ✅ Funcionalidades principais

- **Login e Cadastro de Usuários**
  - Autenticação segura com Firebase Authentication
  - Validação de e-mail e senha
  - Tratamento de erros de login (e-mail inválido, senha errada, etc.)

- **Gestão de Produtos**
  - Cadastro de novos produtos com os campos: Nome, Descrição, Código, Referência, Categoria, Marca, Peso, Dimensões, Quantidade, Preço de Custo, Preço de Venda e Imagens
  - Edição de produtos existentes
  - Upload de fotos diretamente da câmera
  - Visualização detalhada dos produtos via modal
  - Remoção de imagens com confirmação, só aplicada ao salvar
  - Máscaras de input: valores monetários (R$), peso (kg), dimensões (cm), etc.

- **Controle de Movimentações**
  - Registro de movimentações de **Entrada** e **Saída** de estoque
  - Busca de produtos por Nome, Código ou Referência com autocomplete estilo Amazon
  - Atualização automática da quantidade em estoque após cada movimentação
  - Listagem de movimentações agrupadas por data

- **Tela Inicial – Dashboard**
  - Exibe os **produtos em falta (quantidade = 0)** e os **produtos com estoque baixo (menos de 3 unidades)**
  - Mostra também as **últimas movimentações**
  - Formatação amigável para valores monetários e datas de última movimentação

- **Persistência em Nuvem**
  - Todos os dados são armazenados no **Firebase Realtime Database**, isolados por usuário (`usuarios/{uid}/`)

- **Proteção de Dados**
  - Regras de segurança Firebase configuradas para permitir acesso **somente a usuários autenticados**
  - Restrição da API key por **SHA-1/SHA-256** da assinatura do app

## ✅ Tecnologias utilizadas

- **Frontend:** React Native com Expo Router
- **Banco de Dados:** Firebase Realtime Database
- **Autenticação:** Firebase Authentication
- **Build e Deploy:** EAS Build (Expo Application Services)
- **Linguagem:** TypeScript
- **UI & Componentes:** React Native + Expo Vector Icons + React Native Picker
- **Câmera:** Expo ImagePicker (acesso à câmera para fotos dos produtos)

## ✅ Peculiaridades e decisões arquiteturais

- Estrutura modular de pastas com navegação por Stack e Tabs usando **Expo Router**
- Integração direta com o **Realtime Database** para escrita/leitura de produtos e movimentações
- Validação de campos e formatação (máscaras) **antes da persistência**
- Uso de **KeyboardAvoidingView + ScrollView + TouchableWithoutFeedback** para evitar problemas de layout ao abrir o teclado
- As imagens dos produtos são armazenadas **como base64 no banco**, facilitando o envio sem Firebase Storage
- Placeholders com `placeholderTextColor` específico para garantir visibilidade no Android
- Cálculo automático da margem de lucro (%) na tela de cadastro de produtos
- Busca com autocomplete otimizado por quantidade de caracteres digitados e limite de resultados (5)


## ✅ Apoio na resolução de problemas

Durante o desenvolvimento deste projeto, foram utilizadas consultas e auxílios de ferramentas como:

- **ChatGPT (OpenAI)** – para auxílio na resolução de problemas, melhorias de layout e estruturação de código
- **StackOverflow** – solução direta para o problema de autenticação do Firebase no Expo, conforme a thread:
  [https://stackoverflow.com/questions/79602687/react-native-expo-firebase-auth-component-auth-has-not-been-registered-yet/79603601#79603601](https://stackoverflow.com/questions/79602687/react-native-expo-firebase-auth-component-auth-has-not-been-registered-yet/79603601#79603601)
