# 🍃 TaggyGreen - Documentação de Arquitetura (Front-end)

Olá, time! Bem-vindos ao **TaggyGreen**, o projeto em parceria com a Taggy e a Edenred. 

Este documento foi criado para guiar vocês pela nossa arquitetura Front-end. Nós construímos esse "esqueleto" pensando em escalabilidade e organização. O nosso objetivo final é entregar um WebApp rápido, dividido entre dois públicos: Motoristas (B2C) e Gestão de Frotas (B2B).

A nossa stack principal é: **React + Vite + Tailwind CSS + React Router Dom**.

Abaixo, vocês encontram a explicação de cada pedacinho da nossa pasta `src/`. Usem este guia sempre que tiverem dúvidas sobre onde criar um arquivo novo!

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
* **`images/`**: Onde guardamos as logos da Taggy e da Edenred e fundos de tela[cite: 296, 297].
* **`icons/`**: Nossos SVGs e ícones de sustentabilidade que usamos pela interface.

### 🧩 Detalhando `components/`
Aqui ficam as nossas "Peças de Lego". São componentes visuais "burros", ou seja, eles não buscam dados no banco, apenas recebem informações e mostram na tela.
* **`common/`**: Coisas genéricas que usamos em todo lugar. Ex: Botões, Inputs de texto, Spinners de carregamento e Cards.
* **`layout/`**: As cascas das páginas. Ex: `Header` (barra superior), `Sidebar` (menu lateral) e `Footer`.

### 🧠 Detalhando `contexts/`
Usamos a Context API do React aqui. Pensem no Contexto como um "alto-falante global". Quando uma informação precisa estar disponível para o app inteiro sem precisarmos passar de componente em componente.
* **`AuthContext.js`**: Sabe dizer para qualquer tela se o usuário está logado e se ele é um Gestor ou Motorista.
* **`ThemeContext.js`**: Guardaria a informação se o usuário prefere o Tema Claro ou Escuro.

### 🪝 Detalhando `hooks/`
Regras de negócio e lógicas do React que se repetem muito. Extraímos para cá para deixar o código mais limpo.
* **`useAuth.js`**: Um atalho para acessar os dados do `AuthContext`.
* **`useFetchMetrics.js`**: Uma função customizada que cuida de buscar os dados de CO2, gerenciando sozinha se a tela deve mostrar um "Loading..." ou uma mensagem de erro.

### 📱 Detalhando `pages/`
Aqui ficam as Telas Reais. Elas importam as "peças de Lego" dos `components/`, buscam os dados da API e montam a página final.
* **`Auth/Login.jsx`**: A primeira tela que o usuário vê.
* **`B2C/Hub/`**: A dashboard "Meu Rastro Verde".
* [cite_start]**`B2C/Marketplace/`**: Modelo de parceria com troca de produtos/pontos[cite: 372].
* [cite_start]**`B2B/Dashboard/`**: O painel Dashboard ESG[cite: 467, 472].
* [cite_start]**`B2B/Simulador/`**: Painel de cálculo[cite: 370].

### 🚦 Detalhando `routes/`
É o guarda de trânsito que define qual tela deve aparecer dependendo da URL que o usuário digitou.
* **`index.jsx`**: O mapa completo do site. Associa URLs (`/b2c/hub`) com as páginas.
* **`PrivateRoute.jsx`**: Nosso segurança de balada. Ele verifica: "Esse usuário está logado? Ele tem permissão para ver essa tela?". Se não, ele expulsa de volta pro Login.

### 📨 Detalhando `services/`
O nosso "carteiro". É a única pasta autorizada a falar com o mundo externo (a API que a equipe de Back-end construiu).
* **`api.js`**: A configuração básica do `Axios` (ferramenta de requisição), onde colocamos a URL base do nosso servidor.
* **`authService.js`**: Funções exclusivas para mandar e-mail e senha e receber o token de acesso.
* **`metricsService.js`**: Funções para pedir ao back-end os cálculos de CO2.

### 🧰 Detalhando `utils/`
Nossa caixa de ferramentas contendo funções Javascript puras, que não dependem do React. 
* **`formatters.js`**: Funções como `formatarMoeda(100)` ou `formatarPlaca("abc1234")`.
* **`calculations.js`**: Nossas regras de negócio matemáticas, como a fórmula principal: Emissões (kg CO2) = Consumo (l) * Fator de Emissão (kg/l)[cite: 356].

### 🚪 Detalhando `App.jsx` & `main.jsx`
* **`App.jsx`**: O grande envelope do projeto. Ele junta as rotas e os contextos.
* **`main.jsx`**: O arquivo que o Vite procura primeiro. Ele pega o `App.jsx` e injeta dentro do HTML.