\# 📚 Catálogo de Funções ADVPL / TOTVS Protheus



Documentação técnica interativa e \*\*100% offline\*\* das principais funções nativas do ADVPL e do Framework TOTVS Protheus, desenvolvida com foco em consulta rápida, precisão de sintaxe e exemplos práticos do dia a dia.



\## ✨ Funcionalidades



\- \*\*100% Offline (Zero Dependências Externas):\*\* Não utiliza CDNs, fontes externas ou requisições de rede (`fetch`). Funciona diretamente via protocolo `file://` com duplo clique no navegador, sem erros de CORS e sem necessidade de servidor web.

\- \*\*Busca Instantânea:\*\* Pesquisa em tempo real (insensível a maiúsculas e acentos) por nome da função, sintaxe ou descrição.

\- \*\*Filtros por Categoria:\*\* Alternância rápida entre grupos de funções (Strings, Arrays, Datas, Banco de Dados, Framework Protheus, Mensagens/Telas, etc.).

\- \*\*Tela de Detalhes Dedicada:\*\* Ao clicar em qualquer função, exibe sintaxe completa, tipo de retorno, parâmetros detalhados (obrigatórios e opcionais) e exemplos comentados com botão de \*\*Copiar código\*\*.

\- \*\*Navegação Prática:\*\* Suporte a roteamento por hash na URL (`#StrTran`, `#RecLock`, etc.) e retorno rápido pela tecla `ESC`.



\## 📁 Estrutura do Projeto



O projeto oferece duas modalidades de uso para atender tanto o compartilhamento rápido quanto a evolução modular:



```text

catalogo\_funcoes\_advpl/

├── documentacao\_advpl.html         # Arquivo único autocontido (HTML + CSS + JS + Dados)

└── catalogo\_advpl/                 # Versão modular para manutenção e expansão

&#x20;   ├── index.html                  # Interface principal e tela de detalhes

&#x20;   ├── style.css                   # Estilização limpa e responsiva

&#x20;   ├── app.js                      # Lógica de busca, filtros e roteamento

&#x20;   └── dados/                      # Arquivos de dados separados por categoria

&#x20;       ├── strings.js              # Manipulação de textos (StrTran, PadL, SubStr, etc.)

&#x20;       ├── arrays.js               # Manipulação de vetores (aAdd, aScan, aSort, etc.)

&#x20;       ├── datas.js                # Datas e horas (Date, dToS, MonthSum, etc.)

&#x20;       ├── banco\_dados.js          # ISAM, SX6 e SQL (DbSeek, RecLock, GetMV, TCQuery, etc.)

&#x20;       ├── framework\_fw.js         # Funções do Framework (FWxFilial, etc.)

&#x20;       └── mensagens\_telas.js      # Diálogos e logs (MsgInfo, Aviso, ConOut, etc.)

```



\## 🚀 Como Usar



1\. \*\*Uso Rápido (Arquivo Único):\*\*

&#x20;  - Baixe ou clone este repositório e dê um duplo clique em `documentacao\_advpl.html`.

2\. \*\*Uso Modular (Pasta):\*\*

&#x20;  - Abra o arquivo `catalogo\_advpl/index.html` diretamente no navegador.



\## 🧩 Como Adicionar Novas Funções



Para expandir o catálogo na versão modular:

1\. Crie ou edite um arquivo dentro de `catalogo\_advpl/dados/` seguindo o padrão de objetos existente.

2\. Caso crie um novo arquivo `.js`, importe-o via tag `<script src="dados/novo\_arquivo.js"></script>` no `catalogo\_advpl/index.html` antes do `app.js`.



\## 🛠️ Tecnologias Utilizadas



\- HTML5 Semântico

\- CSS3 (Variáveis CSS, Flexbox e Grid)

\- JavaScript Vanilla (ES6+)

