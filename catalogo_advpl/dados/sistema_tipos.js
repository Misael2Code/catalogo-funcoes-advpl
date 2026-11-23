/**
 * Catalogo de Funcoes ADVPL - Modulo Tipos e Validacoes de Sistema
 * Funcoes essenciais para verificacao de tipos, condicionais, metadados de banco e validacoes de dicionario
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "Empty",
    categoria: "Tipos e Validações",
    sintaxe: "Empty( <exp> )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se uma expressão ou variável está vazia de acordo com seu tipo de dado.",
    descricaoDetalhada: "Avalia a expressão informada. Retorna .T. para strings vazias ou contendo apenas espaços, número zero (0), datas vazias (CTOD('  /  /  ')), valores lógicos .F. e arrays vazios ({}).",
    parametros: [
      { nome: "exp", tipo: "Qualquer tipo", descricao: "Expressão ou variável a ser avaliada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Validação de preenchimento de campos e variáveis
User Function ExEmpty()
    Local cTexto := "   "
    Local nValor := 0
    Local aLista := {}

    ConOut("Texto vazio: " + cValToChar(Empty(cTexto)))  // .T.
    ConOut("Valor zerado: " + cValToChar(Empty(nValor))) // .T.
    ConOut("Array vazio: " + cValToChar(Empty(aLista)))  // .T.

    If Empty(cTexto)
        ConOut("O preenchimento do campo é obrigatório!")
    EndIf
Return`
  },
  {
    nome: "ValType",
    categoria: "Tipos e Validações",
    sintaxe: "ValType( <exp> )",
    retorno: "Caractere (1 caractere com o tipo do dado)",
    descricaoCurta: "Retorna o tipo de dado resultante da avaliação direta de uma expressão ou variável.",
    descricaoDetalhada: "Identifica o tipo de dado em tempo de execução: 'C' (Caractere), 'N' (Numérico), 'D' (Data), 'L' (Lógico), 'A' (Array), 'B' (Bloco de Código), 'O' (Objeto), 'M' (Memo) ou 'U' (Indefinido / NIL).",
    parametros: [
      { nome: "exp", tipo: "Qualquer tipo", descricao: "Expressão ou variável a ser inspecionada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Tratamento dinâmico de tipo de parâmetro
User Function ExValType()
    Local xValor := 125.50

    If ValType(xValor) == "N"
        ConOut("A variável xValor é do tipo Numérico.")
    ElseIf ValType(xValor) == "C"
        ConOut("A variável xValor é uma String.")
    ElseIf ValType(xValor) == "A"
        ConOut("A variável xValor é um Array.")
    EndIf
Return`
  },
  {
    nome: "Type",
    categoria: "Tipos e Validações",
    sintaxe: "Type( <cExpressao> )",
    retorno: "Caractere (1 caractere com o tipo ou 'U')",
    descricaoCurta: "Avalia uma expressão passada em forma de string e retorna o tipo de dado da variável ou campo.",
    descricaoDetalhada: "Diferente de ValType (que recebe o valor diretamente), Type recebe uma string com o identificador da variável, função ou campo (ex: 'SA1->A1_NOME'). Se o identificador não existir no escopo ou tabela, retorna 'U' (Undefined).",
    parametros: [
      { nome: "cExpressao", tipo: "Caractere", descricao: "Expressão ou nome de variável/campo em formato de texto.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação de existência de campo ou variável pública
User Function ExType()
    // Verifica se o campo existe na tabela antes de acessá-lo
    If Type("SA1->A1_NOME") != "U"
        ConOut("Campo SA1->A1_NOME existe e é do tipo: " + Type("SA1->A1_NOME"))
    Else
        ConOut("Campo SA1->A1_NOME não está acessível no contexto atual.")
    EndIf
Return`
  },
  {
    nome: "If",
    categoria: "Tipos e Validações",
    sintaxe: "If( <lCondicao>, <expVerdadeiro>, <expFalso> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Função condicional inline que avalia uma condição lógica e retorna um de dois valores possíveis.",
    descricaoDetalhada: "Avalia a condição booleana no primeiro parâmetro. Se for .T., retorna o resultado da segunda expressão; se for .F., retorna o resultado da terceira expressão. Equivale ao operador ternário.",
    parametros: [
      { nome: "lCondicao", tipo: "Lógico", descricao: "Condição lógica a ser avaliada.", opcional: false },
      { nome: "expVerdadeiro", tipo: "Qualquer tipo", descricao: "Valor retornado se a condição for .T.", opcional: false },
      { nome: "expFalso", tipo: "Qualquer tipo", descricao: "Valor retornado se a condição for .F.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Atribuição condicional concisa
User Function ExIf()
    Local lAtivo  := .T.
    Local cStatus := If(lAtivo, "USUARIO ATIVO", "USUARIO BLOQUEADO")
    ConOut("Status do operador: " + cStatus)
Return`
  },
  {
    nome: "IIf",
    categoria: "Tipos e Validações",
    sintaxe: "IIf( <lCondicao>, <expVerdadeiro>, <expFalso> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Forma alternativa tradicional da função condicional inline (Immediate If).",
    descricaoDetalhada: "Sinônimo exato da função If(). Muito utilizada em fórmulas de dicionário de dados (SX3, SX1), filtros de relatórios e inicializadores de campos no Protheus.",
    parametros: [
      { nome: "lCondicao", tipo: "Lógico", descricao: "Condição lógica avaliada.", opcional: false },
      { nome: "expVerdadeiro", tipo: "Qualquer tipo", descricao: "Valor retornado caso verdadeiro.", opcional: false },
      { nome: "expFalso", tipo: "Qualquer tipo", descricao: "Valor retornado caso falso.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Uso em regras de cálculo e exibição
User Function ExIIf()
    Local nEstoque := 5
    Local cAviso   := IIf(nEstoque > 0, "Estoque Disponível", "PRODUTO ESGOTADO")
    ConOut("Situação do item: " + cAviso)
Return`
  },
  {
    nome: "RetSqlName",
    categoria: "Tipos e Validações",
    sintaxe: "RetSqlName( <cAlias> )",
    retorno: "Caractere (String com o nome físico da tabela no SGBD)",
    descricaoCurta: "Retorna o nome físico real da tabela no banco de dados relacional associado ao alias Protheus.",
    descricaoDetalhada: "Converte o alias do Protheus (ex: 'SA1', 'SB1') no nome físico da tabela no banco de dados, anexando o sufixo da empresa e filial corrente (ex: 'SA1010' ou 'SA1990'). Obrigatória na construção de qualquer consulta SQL.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela no dicionário SX2 (ex: 'SA1', 'SC5').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Construção de query SQL apontando para a tabela correta
User Function ExRetSqlName()
    Local cTabSA1 := RetSqlName("SA1")
    Local cSQL    := "SELECT A1_COD, A1_NOME FROM " + cTabSA1 + " WHERE D_E_L_E_T_ = ' '"

    ConOut("Tabela física no banco: " + cTabSA1)
    ConOut("Query montada: " + cSQL)
Return`
  },
  {
    nome: "TCSqlExec",
    categoria: "Tipos e Validações",
    sintaxe: "TCSqlExec( <cQuery> )",
    retorno: "Numérico (0 se sucesso ou código de erro negativo do SGBD)",
    descricaoCurta: "Executa uma instrução SQL de manipulação (UPDATE, INSERT, DELETE, DDL) diretamente no banco.",
    descricaoDetalhada: "Envia instruções SQL que não retornam cursores de dados (operações DML/DDL) diretamente para o banco via DBAccess. Retorna número maior ou igual a zero em caso de sucesso; se for negativo, consulte a função TCSqlError().",
    parametros: [
      { nome: "cQuery", tipo: "Caractere", descricao: "Comando SQL a ser executado no SGBD.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Execução de comando UPDATE direto via DBAccess
User Function ExTCSqlExec()
    Local cUpdate := "UPDATE " + RetSqlName("SZ1") + " SET Z1_STATUS = '1' WHERE Z1_STATUS = '0' AND D_E_L_E_T_ = ' '"
    Local nStatus := TCSqlExec(cUpdate)

    If nStatus >= 0
        ConOut("Comando SQL executado com sucesso no SGBD!")
    Else
        ConOut("Erro na execução SQL: " + TCSqlError())
    EndIf
Return`
  },
  {
    nome: "ExistCpo",
    categoria: "Tipos e Validações",
    sintaxe: "ExistCpo( <cAlias>, <cValor>, [<nOrdem>] )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Valida a existência de um valor na chave de uma tabela cadastrada no Protheus.",
    descricaoDetalhada: "Função padrão de validação no dicionário de dados (SX3). Pesquisa se <cValor> existe na tabela <cAlias>. Se não existir, dispara a mensagem de help de sistema padrão e retorna .F.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela pesquisada (ex: 'SA1', 'SB1').", opcional: false },
      { nome: "cValor", tipo: "Caractere", descricao: "Código ou valor a ser validado na tabela.", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem do índice a ser pesquisado (padrão: 1).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Validação de campo de cliente
User Function ExExistCpo()
    Local cCodCliente := "000001"

    If ExistCpo("SA1", cCodCliente, 1)
        ConOut("Cliente validado com sucesso!")
    Else
        ConOut("Cliente inválido ou não cadastrado.")
    EndIf
Return`
  },
  {
    nome: "ExistChav",
    categoria: "Tipos e Validações",
    sintaxe: "ExistChav( <cAlias>, <cChave>, [<nOrdem>], [<cHelp>] )",
    retorno: "Lógico (.T. se NÃO existe duplicidade, .F. se chave já cadastrada)",
    descricaoCurta: "Verifica se uma chave de registro já existe na tabela para evitar duplicidade de cadastros.",
    descricaoDetalhada: "Utilizada nas validações de chave primária no Protheus. Retorna .T. se a chave estiver livre (não existir no banco), permitindo a inclusão; se já existir, dispara mensagem de duplicidade e retorna .F.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela (ex: 'SB1').", opcional: false },
      { nome: "cChave", tipo: "Caractere", descricao: "Chave completa a ser verificada (incluindo filial se tabela exclusiva).", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem do índice (padrão: 1).", opcional: true },
      { nome: "cHelp", tipo: "Caractere", descricao: "Código do Help a disparar se duplicado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Validação anti-duplicidade em inclusão de produto
User Function ExExistChav()
    Local cNovoCod := "PROD999"

    If ExistChav("SB1", xFilial("SB1") + cNovoCod, 1)
        ConOut("Código disponível para novo cadastro.")
    Else
        ConOut("Código já em uso! Cadastro rejeitado.")
    EndIf
Return`
  },
  {
    nome: "Help",
    categoria: "Tipos e Validações",
    sintaxe: "Help( [<cRotina>], [<nLinha>], <cHelp>, [<cCampo>], <cMensagem>, <nTipo>, [<nHelp>] )",
    retorno: "NIL",
    descricaoCurta: "Apresenta a janela padrão de Help do Protheus exibindo mensagens de validação e solução para o usuário.",
    descricaoDetalhada: "Abre o diálogo oficial de Help do sistema (com abas de Problema e Solução). Usada em regras de validação de campos (X3_VALID) e rotinas de validação de formulários.",
    parametros: [
      { nome: "cRotina", tipo: "Caractere", descricao: "Nome da rotina chamadora.", opcional: true },
      { nome: "nLinha", tipo: "Numérico", descricao: "Número da linha no código.", opcional: true },
      { nome: "cHelp", tipo: "Caractere", descricao: "Código identificador do Help no dicionário SX1/SX6.", opcional: false },
      { nome: "cCampo", tipo: "Caractere", descricao: "Nome do campo gerador da validação.", opcional: true },
      { nome: "cMensagem", tipo: "Caractere", descricao: "Descrição detalhada do problema ou erro.", opcional: false },
      { nome: "nTipo", tipo: "Numérico", descricao: "Tipo de Help (1: Atenção/Erro de validação).", opcional: false },
      { nome: "nHelp", tipo: "Numérico", descricao: "Código numérico do help.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Disparo de mensagem de Help de validação
User Function ExHelp()
    Local cMsg := "O campo Quantidade deve conter valor superior a zero para este produto."
    Help("", 1, "QTDINVALIDA", , cMsg, 1, 0)
Return`
  }
);
