# 🍃 TaggyGreen - Documentação de Arquitetura (Front-end)

Olá, time! Bem-vindos ao **TaggyGreen**, o projeto em parceria com a Taggy e a Edenred. 

Este documento foi criado para guiar vocês pela nossa arquitetura Front-end. Nós construímos esse "esqueleto" pensando em escalabilidade e organização. O nosso objetivo final é entregar um WebApp rápido, dividido entre dois públicos: Motoristas (B2C) e Gestão de Frotas (B2B).

Abaixo, vocês encontram a explicação das ferramentas que escolhemos e de cada pedacinho da nossa pasta `src/`. Usem este guia sempre que tiverem dúvidas!

---

## 🛠️ Nossas Ferramentas e Tecnologias

Para entregar um projeto moderno e de alta performance, escolhemos a dedo a nossa stack de desenvolvimento. Além de ferramentas de gestão como o Taiga para organização das Sprints, o GitHub para versionamento e o Figma para prototipação, nossa base de código utiliza:

### ⚡ Vite
**Por que usamos:** É a ferramenta de construção (bundler) mais rápida do mercado atualmente. 
**Como funciona:** Ele serve nosso código instantaneamente durante o desenvolvimento e empacota tudo de forma super otimizada quando vamos subir para produção.
**Como foi instalado:** `npm create vite@latest . -- --template react`

### ⚛️ React
**Por que usamos:** É a biblioteca padrão da indústria para criar interfaces de usuário dinâmicas e componentizadas.
**Como funciona:** Ele atualiza apenas as partes da tela que sofreram mudanças (usando o Virtual DOM), sem precisar recarregar a página inteira.
**Como foi instalado:** Ele já vem embutido quando criamos o projeto com o template do Vite.

### 🎨 Tailwind CSS (v4 com Vite Plugin)
**Por que usamos:** Elimina a necessidade de dezenas de arquivos `.css` externos. Ele nos permite padronizar a identidade visual da Taggy e Edenred de forma ágil.
**Como funciona:** Fornece "classes utilitárias" diretas no HTML/JSX. Estamos utilizando a versão mais moderna (v4) integrada diretamente ao Vite, o que deixa o carregamento de estilos ainda mais rápido e dispensa arquivos pesados de configuração.
**Como foi instalado:** `npm install -D tailwindcss @tailwindcss/vite`

### 🛣️ React Router Dom
**Por que usamos:** Nosso WebApp é uma *Single Page Application* (SPA), ou seja, a página web nunca recarrega de verdade. Precisávamos de algo para gerenciar a navegação fluida.
**Como funciona:** Ele intercepta a URL do navegador e "injeta" o componente correto na tela, como a tela de Login ou o Dashboard ESG.
**Como foi instalado:** `npm install react-router-dom`

### 📡 Axios
**Por que usamos:** É mais robusto e fácil de configurar do que o `fetch` nativo do navegador para comunicar com a API do back-end.
**Como funciona:** Ele envia requisições HTTP (GET, POST) para o nosso servidor, convertendo automaticamente os dados para JSON e facilitando o envio de Tokens de segurança.
**Como foi instalado:** `npm install axios`

### 🖼️ Lucide React
**Por que usamos:** Precisamos de ícones bonitos, modernos e leves para ilustrar o Rastro Verde e o Dashboard.
**Como funciona:** Ele fornece os ícones em formato de componentes React que podemos colorir e redimensionar facilmente via propriedades.
**Como foi instalado:** `npm install lucide-react`

---

## 📂 Entendendo a nossa Árvore de Pastas (`/src`)

Nossa arquitetura segue o modelo baseado em "Domínios e Features". Isso significa que separamos as coisas por responsabilidade.

* **`assets/`**: A nossa gaveta de mídias.
* **`components/`**: Nossas peças de Lego (Componentes Burros).
* **`contexts/`**: A memória global da aplicação.
* **`hooks/`**: Nossas ferramentas customizadas do React.
* **`pages/`**: As telas finais (Componentes Inteligentes).
* **`routes/`**: O guarda de trânsito da navegação.
* **`services/`**: Nosso carteiro (Comunicação com o Back-end).
* **`utils/`**: A caixa de ferramentas e matemática.
* **`App.jsx`**: O agrupador principal.
* **`main.jsx`**: A porta de entrada do React.

---

### 🖼️ Detalhando `assets/`
Arquivos estáticos que não mudam com a lógica do sistema.
* **`images/`**: Onde guardamos as logos da Taggy e da Edenred e fundos de tela.
* **`icons/`**: Nossos SVGs e ícones de sustentabilidade que usamos pela interface.

### 🧩 Detalhando `components/`
Aqui ficam as nossas "Peças de Lego". São componentes visuais "burros", ou seja, eles não buscam dados no banco, apenas recebem informações e mostram na tela.
* **`common/`**: Coisas genéricas que usamos em todo lugar. Ex: Botões, Inputs de texto, Spinners de carregamento e Cards.
* **`layout/`**: As cascas das páginas. Ex: `Header` (barra superior), `Sidebar` (menu lateral) e `Footer`.

---

### 🧠 Detalhando `contexts/`
Usamos a Context API do React aqui.
* **`ThemeContext.js`**: Guardaria a informação se o usuário prefere o Tema Claro ou Escuro.

### 🪝 Detalhando `hooks/`
Regras de negócio e lógicas do React que se repetem muito.
* **`useFetchMetrics.js`**: Uma função customizada que cuida de buscar os dados de CO2, gerenciando sozinha os estados de "Loading..." e erro.

### 📱 Detalhando `pages/`
Aqui ficam as Telas Reais. Elas importam as "peças de Lego" dos `components/`.
* **`B2C/Hub/`**: A dashboard "Meu Rastro Verde".
* **`B2C/Marketplace/`**: Modelo de parceria com troca de produtos/pontos.
* **`B2B/Dashboard/`**: O painel Dashboard ESG.
* **`B2B/Simulador/`**: Painel de cálculo.

### 🚦 Detalhando `routes/`
É o guarda de trânsito que define qual tela deve aparecer dependendo da URL que o usuário digitou.
* **`index.jsx`**: O mapa completo do site. Associa URLs (`/b2c/hub`) com as páginas.

### 📨 Detalhando `services/`
O nosso "carteiro". É a única pasta autorizada a falar com o mundo externo.
* **`api.js`**: A configuração básica do `Axios` (ferramenta de requisição).
* **`metricsService.js`**: Funções para pedir ao back-end os cálculos de CO2.

### 🧰 Detalhando `utils/`
Nossa caixa de ferramentas contendo funções Javascript puras, que não dependem do React. 
* **`formatters.js`**: Funções como `formatarMoeda(100)` ou `formatarPlaca("abc1234")`.
* **`calculations.js`**: Nossas regras de negócio matemáticas, como a fórmula principal: Emissões (kg CO2) = Consumo (l) * Fator de Emissão (kg/l).

### 🚪 Detalhando `App.jsx` & `main.jsx`
* **`App.jsx`**: O grande envelope do projeto. Ele junta as rotas e os contextos.
* **`main.jsx`**: O arquivo que o Vite procura primeiro. Ele pega o `App.jsx` e injeta dentro do HTML.

---

## 🚀 Como rodar o projeto pela primeira vez

Para rodar o TaggyGreen na sua máquina local, siga os passos no seu terminal:

**1. Clone o repositório e instale todas as dependências:**

npm install

**2. Rode o servidor de desenvolvimento:**

npm run dev

**3. Acesse no seu navegador:** http://localhost:5173