# 📚 Catálogo de Funções ADVPL / TOTVS Protheus

Documentação técnica interativa e **100% offline** das principais funções nativas do ADVPL e do Framework TOTVS Protheus, desenvolvida com foco em consulta rápida, precisão de sintaxe e exemplos práticos do dia a dia.

## 🌐 Acessar Online (GitHub Pages)

- 👉 **[Abrir Catálogo Interativo (Versão Modular)](https://github.io)**
- 👉 **[Abrir Catálogo Interativo (Arquivo Único)](https://github.io)**

## ✨ Funcionalidades

- **100% Offline (Zero Dependências Externas):** Não utiliza CDNs, fontes externas ou requisições de rede (`fetch`). Funciona diretamente via protocolo `file://` com duplo clique no navegador, sem erros de CORS e sem necessidade de servidor web.
- **Busca Instantânea:** Pesquisa em tempo real (insensível a maiúsculas e acentos) por nome da função, sintaxe ou descrição.
- **Filtros por Categoria:** Alternância rápida entre grupos de funções (Strings, Arrays, Datas, Banco de Dados, Framework Protheus, Mensagens/Telas, etc.).
- **Tela de Detalhes Dedicada:** Ao clicar em qualquer função, exibe sintaxe completa, tipo de retorno, parâmetros detalhados (obrigatórios e opcionais) e exemplos comentados com botão de **Copiar código**.
- **Navegação Prática:** Suporte a roteamento por hash na URL (`#StrTran`, `#RecLock`, etc.) e retorno rápido pela tecla `ESC`.

## 📁 Estrutura do Projeto

O projeto oferece duas modalidades de uso para atender tanto o compartilhamento rápido quanto a evolução modular:

```text
catalogo_funcoes_advpl/
├── documentacao_advpl.html         # Arquivo único autocontido (HTML + CSS + JS + Dados)
└── catalogo_advpl/                 # Versão modular para manutenção e expansão
    ├── index.html                  # Interface principal e tela de detalhes
    ├── style.css                   # Estilização limpa e responsiva
    ├── app.js                      # Lógica de busca, filtros e roteamento
    └── dados/                      # Arquivos de dados separados por categoria
        ├── strings.js              # Manipulação de textos (StrTran, PadL, SubStr, etc.)
        ├── arrays.js               # Manipulação de vetores (aAdd, aScan, aSort, etc.)
        ├── datas.js                # Datas e horas (Date, dToS, MonthSum, etc.)
        ├── banco_dados.js          # ISAM, SX6 e SQL (DbSeek, RecLock, GetMV, TCQuery, etc.)
        ├── framework_fw.js         # Funções do Framework (FWxFilial, etc.)
        └── mensagens_telas.js      # Diálogos e logs (MsgInfo, Aviso, ConOut, etc.)
```

## 🚀 Como Usar Offline

1. **Uso Rápido (Arquivo Único):**
   - Baixe ou clone este repositório e dê um duplo clique em `documentacao_advpl.html`.
2. **Uso Modular (Pasta):**
   - Abra o arquivo `catalogo_advpl/index.html` diretamente no navegador.

## 🧩 Como Adicionar Novas Funções

Para expandir o catálogo na versão modular:
1. Crie ou edite um arquivo dentro de `catalogo_advpl/dados/` seguindo o padrão de objetos existente.
2. Caso crie um novo arquivo `.js`, importe-o via tag `<script src="dados/novo_arquivo.js"></script>` no `catalogo_advpl/index.html` antes do `app.js`.

## 🛠️ Tecnologias Utilizadas

- HTML5 Semântico
- CSS3 (Variáveis CSS, Flexbox e Grid)
- JavaScript Vanilla (ES6+)
