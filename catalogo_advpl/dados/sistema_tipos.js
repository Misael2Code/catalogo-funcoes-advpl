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
  },
  {
    nome: "Posicione",
    categoria: "Tipos e Validações",
    sintaxe: "Posicione( <cAlias>, <nOrdem>, <cChave>, <cCampoRetorno> )",
    retorno: "Qualquer tipo (Conteúdo do campo pesquisado)",
    descricaoCurta: "Busca e retorna o conteúdo de um campo em outra tabela com cache e posicionamento automático.",
    descricaoDetalhada: "Uma das funções mais importantes do Protheus. Posiciona a tabela <cAlias> pelo índice <nOrdem> buscando <cChave>. Se encontrar, retorna o conteúdo de <cCampoRetorno>; se não encontrar, retorna o valor padrão vazio correspondente ao tipo do campo. Gerencia cache interno automático de alta velocidade.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela a pesquisar (ex: 'SA1', 'SB1').", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem do índice a ser pesquisado.", opcional: false },
      { nome: "cChave", tipo: "Caractere", descricao: "Chave de busca montada (incluindo filial se exclusiva).", opcional: false },
      { nome: "cCampoRetorno", tipo: "Caractere", descricao: "Nome do campo cujo conteúdo será retornado (ex: 'A1_NOME').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Obtenção de nome do cliente em 1 linha
User Function ExPosicione()
    Local cFilialSA1 := xFilial("SA1")
    Local cCodCli    := "000001"
    Local cLojaCli   := "01"
    Local cNomeCli   := ""

    cNomeCli := Posicione("SA1", 1, cFilialSA1 + cCodCli + cLojaCli, "A1_NOME")
    ConOut("Nome do Cliente: " + cNomeCli)
Return`
  },
  {
    nome: "SuperGetMV",
    categoria: "Tipos e Validações",
    sintaxe: "SuperGetMV( <cParametro>, [<lHelp>], [<xPadrao>] )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Obtém o conteúdo de um parâmetro do sistema SX6 com cache em memória de alta performance.",
    descricaoDetalhada: "Versão otimizada e recomendada que substitui a tradicional GetMV(). Mantém os parâmetros em cache de memória do processo/thread, evitando leituras repetidas e sobrecarga de banco de dados.",
    parametros: [
      { nome: "cParametro", tipo: "Caractere", descricao: "Nome do parâmetro no SX6 (ex: 'MV_ESTADO').", opcional: false },
      { nome: "lHelp", tipo: "Lógico", descricao: "Dispara Help caso não exista (padrão: .F.).", opcional: true },
      { nome: "xPadrao", tipo: "Qualquer tipo", descricao: "Valor de fallback retornado se o parâmetro não estiver cadastrado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Leitura rápida de parâmetros com cache
User Function ExSuperGetMV()
    Local cUFPadrao   := SuperGetMV("MV_ESTADO", .F., "SP")
    Local lEnviaEmail := SuperGetMV("MV_ENVMAIL", .F., .F.)

    ConOut("UF Padrão: " + cUFPadrao)
    ConOut("Envia E-mail: " + cValToChar(lEnviaEmail))
Return`
  },
  {
    nome: "GetNewPar",
    categoria: "Tipos e Validações",
    sintaxe: "GetNewPar( <cParametro>, <xPadrao> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Obtém o valor de um parâmetro do SX6 ou retorna um valor padrão sem gerar erro caso não exista.",
    descricaoDetalhada: "Lê o parâmetro do SX6 de forma tolerante a falhas. Se o parâmetro não existir no dicionário de dados da instalação do cliente, retorna automaticamente <xPadrao> sem disparar help ou interromper a execução.",
    parametros: [
      { nome: "cParametro", tipo: "Caractere", descricao: "Nome do parâmetro no SX6.", opcional: false },
      { nome: "xPadrao", tipo: "Qualquer tipo", descricao: "Valor padrão retornado caso não cadastrado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Leitura segura de parâmetro customizado
User Function ExGetNewPar()
    Local nLimiteCredito := GetNewPar("MV_X_LIMCR", 10000.00)
    ConOut("Limite configurado: R$ " + cValToChar(nLimiteCredito))
Return`
  },
  {
    nome: "IsBlind",
    categoria: "Tipos e Validações",
    sintaxe: "IsBlind()",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Indica se a execução atual está rodando em modo não visual / cego (Schedule, Job, Web Service).",
    descricaoDetalhada: "Retorna .T. quando a rotina está em execução em segundo plano sem interface gráfica ativa (SmartClient), como Jobs, Schedules, Threads automáticas e Web Services REST/SOAP. Permite desviar a chamada de mensagens visuais (MsgInfo, Aviso) para logs no ConOut.",
    parametros: [],
    exemplo: `// Exemplo prático: Diferenciação entre execução visual e batch/schedule
User Function ExIsBlind()
    If IsBlind()
        ConOut("[JOB] Processamento finalizado com sucesso via Schedule.")
    Else
        MsgInfo("Processamento finalizado com sucesso!", "Concluído")
    EndIf
Return`
  },
  {
    nome: "GetSX3Cache",
    categoria: "Tipos e Validações",
    sintaxe: "GetSX3Cache( <cCampo>, <cPropriedade> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Consulta propriedades de metadados de campos do dicionário SX3 através do cache de memória.",
    descricaoDetalhada: "Permite ler atributos de campos do dicionário de dados do Protheus em altíssima velocidade sem abrir o arquivo SX3. Propriedades suportadas: 'X3_TITULO', 'X3_TIPO', 'X3_TAMANHO', 'X3_DECIMAL', 'X3_PICTURE', 'X3_VALID', etc.",
    parametros: [
      { nome: "cCampo", tipo: "Caractere", descricao: "Nome do campo no dicionário (ex: 'A1_NOME').", opcional: false },
      { nome: "cPropriedade", tipo: "Caractere", descricao: "Propriedade SX3 desejada (ex: 'X3_TITULO', 'X3_TIPO').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Consulta rápida de metadados de campos
User Function ExGetSX3Cache()
    Local cTitulo := GetSX3Cache("A1_NOME", "X3_TITULO")
    Local nTam    := GetSX3Cache("A1_NOME", "X3_TAMANHO")
    Local cTipo   := GetSX3Cache("A1_NOME", "X3_TIPO")

    ConOut("Campo: A1_NOME | Título: " + cTitulo + " | Tipo: " + cTipo + " | Tam: " + cValToChar(nTam))
Return`
  },
  {
    nome: "GetAdvFVal",
    categoria: "Tipos e Validações",
    sintaxe: "GetAdvFVal( <cAlias>, <cCampoRetorno>, <cChaveBusca>, [<nOrdem>], [<xPadrao>] )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Busca o valor de um campo de tabela via DBAccess/OpenQuery de alta performance.",
    descricaoDetalhada: "Busca rápida de valor de campo que consulta o cache ou executa uma query direta sem mover o ponteiro da área de trabalho ativa.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela pesquisada.", opcional: false },
      { nome: "cCampoRetorno", tipo: "Caractere", descricao: "Campo desejado.", opcional: false },
      { nome: "cChaveBusca", tipo: "Caractere", descricao: "Chave de índice pesquisada.", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem de índice (padrão: 1).", opcional: true },
      { nome: "xPadrao", tipo: "Qualquer tipo", descricao: "Valor padrão retornado caso não encontre.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Leitura de valor de campo sem mover a área ativa
User Function ExGetAdvFVal()
    Local cDescProd := GetAdvFVal("SB1", "B1_DESC", xFilial("SB1") + "PROD001", 1, "PRODUTO NÃO ENCONTRADO")
    ConOut("Descrição: " + cDescProd)
Return`
  },
  {
    nome: "ExecBlock",
    categoria: "Tipos e Validações",
    sintaxe: "ExecBlock( <cFuncao>, [<lParam1>], [<lParam2>], [<xParam3>] )",
    retorno: "Qualquer tipo (Retorno devolvido pela função executada)",
    descricaoCurta: "Executa dinamicamente uma User Function compilada no RPO pelo nome, passando parâmetros.",
    descricaoDetalhada: "Permite invocar rotinas de customização dinamicamente pelo nome (sem necessidade de compilação estática ou linking). O nome da função deve corresponder a uma User Function declarada no RPO (sem o prefixo 'U_'). Muito utilizada para acionamento de pontos de entrada (PE) e rotinas parametrizadas em dicionário.",
    parametros: [
      { nome: "cFuncao", tipo: "Caractere", descricao: "Nome da User Function a executar (sem o prefixo 'U_').", opcional: false },
      { nome: "lParam1", tipo: "Lógico", descricao: "Parâmetro lógico reservado (normalmente .F.).", opcional: true },
      { nome: "lParam2", tipo: "Lógico", descricao: "Parâmetro lógico reservado (normalmente .F.).", opcional: true },
      { nome: "xParam3", tipo: "Qualquer tipo / Array", descricao: "Parâmetro ou vetor de argumentos para a função.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Execução segura de Ponto de Entrada dinâmico
User Function DisparaPE()
    Local cPontoEntrada := "MT010INC"
    Local xResultado    := Nil

    // Valida se o ponto de entrada existe antes de executar
    If ExistBlock(cPontoEntrada)
        xResultado := ExecBlock(cPontoEntrada, .F., .F., {"PARAMETRO_1", 100})
        ConOut("Ponto de entrada executado com sucesso.")
    Else
        ConOut("Ponto de entrada " + cPontoEntrada + " não implementado.")
    EndIf
Return xResultado`
  },
  {
    nome: "ExistBlock",
    categoria: "Tipos e Validações",
    sintaxe: "ExistBlock( <cFuncao> )",
    retorno: "Lógico (.T. se a função existir no RPO, .F. caso contrário)",
    descricaoCurta: "Verifica se uma User Function customizada existe compilada no repositório de objetos (RPO).",
    descricaoDetalhada: "Testa previamente a existência de uma User Function antes de invocá-la com ExecBlock(). Evita erros de execução em tempo de execução (User Function não encontrada) ao chamar pontos de entrada opcionais.",
    parametros: [
      { nome: "cFuncao", tipo: "Caractere", descricao: "Nome da User Function a verificar (sem o prefixo 'U_').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação prévia de Ponto de Entrada customizado
User Function ExExistBlock()
    Local cPonto := "M410LIOK"

    If ExistBlock(cPonto)
        ConOut("O ponto de entrada " + cPonto + " está ativo no RPO.")
    Else
        ConOut("Nenhuma customização encontrada para " + cPonto)
    EndIf
Return`
  },
  {
    nome: "FindFunction",
    categoria: "Tipos e Validações",
    sintaxe: "FindFunction( <cNomeFuncao> )",
    retorno: "Lógico (.T. se a função existir, .F. caso contrário)",
    descricaoCurta: "Verifica se qualquer função nativa, de framework ou customizada está presente no repositório (RPO).",
    descricaoDetalhada: "Testa a existência de qualquer símbolo de função no RPO ativo do Protheus, abrangendo funções nativas de linguagem ADVPL, classes do TOTVS Framework ou funções de usuário (com prefixo 'U_').",
    parametros: [
      { nome: "cNomeFuncao", tipo: "Caractere", descricao: "Nome da função a verificar (com 'U_' se for User Function).", opcional: false }
    ],
    exemplo: `// Exemplo prático: Compatibilidade de versão com FindFunction
User Function ExFindFunction()
    // Testa se uma função mais recente do framework existe no ambiente
    If FindFunction("FWJsonDeserialize")
        ConOut("Framework compatível com serialização JSON nativa.")
    Else
        ConOut("Aviso: Função de JSON não disponível nesta versão do RPO.")
    EndIf
Return`
  },
  {
    nome: "GetCbSource",
    categoria: "Tipos e Validações",
    sintaxe: "GetCbSource( <bBloco> )",
    retorno: "Caractere (Código fonte em texto do bloco de código)",
    descricaoCurta: "Descompila e retorna o texto do código fonte original que compõe um bloco de código (Codeblock).",
    descricaoDetalhada: "Função de depuração e inspeção dinâmica que decompõe um codeblock e retorna sua representação em string legível (ex: '{|x| x * 2}'). Extremamente útil para logs de auditoria e depuração de gatilhos e regras de negócio parametrizadas.",
    parametros: [
      { nome: "bBloco", tipo: "Bloco de Código", descricao: "Codeblock cujo código fonte em texto será inspecionado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Auditoria de código fonte de codeblock dinâmico
User Function ExGetCbSource()
    Local bRegra := {|cDoc| Val(cDoc) > 1000}
    Local cFonte := GetCbSource(bRegra)

    ConOut("Expressão fonte do bloco: " + cFonte)
    // "{|cDoc| Val(cDoc) > 1000}"
Return`
  },
  {
    nome: "ErrorBlock",
    categoria: "Tipos e Validações",
    sintaxe: "ErrorBlock( [<bNovoTratador>] )",
    retorno: "Bloco de Código (Tratador de erro anterior)",
    descricaoCurta: "Define um tratador global customizado de erros para interceptar falhas em tempo de execução.",
    descricaoDetalhada: "Substitui o mecanismo padrão de tratamento de erro do Protheus por um bloco de código customizado {|e| MeuTrataErro(e)}. O bloco recebe um objeto de erro (Error Object) contendo descrição, pilha de chamadas e operação com falha, permitindo capturar exceções sem abortar o sistema.",
    parametros: [
      { nome: "bNovoTratador", tipo: "Bloco de Código", descricao: "Novo bloco de tratamento de erro. Se omitido, mantém o tratador atual.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Interceptação controlada de erros de execução
User Function ExErrorBlock()
    Local bErroPadrao := ErrorBlock({|oErro| TrataErroCustom(oErro)})

    // Código protegido contra quedas abruptas
    U_RotinaSensivel()

    // Restaura o tratador padrão do Protheus
    ErrorBlock(bErroPadrao)
Return

Static Function TrataErroCustom(oErro)
    ConOut("[ERRO INTERCEPTADO] " + oErro:Description)
    Break(oErro)
Return Nil`
  },
  {
    nome: "Break",
    categoria: "Tipos e Validações",
    sintaxe: "Break( [<xValor>] )",
    retorno: "NIL",
    descricaoCurta: "Interrompe a execução normal e desvia o fluxo para o bloco de captura RECOVER de uma estrutura SEQUENCE.",
    descricaoDetalhada: "Mecanismo de controle de fluxo para sinalização de exceções em ADVPL. Quando invocado dentro de uma estrutura BEGIN SEQUENCE ... RECOVER ... END SEQUENCE, interrompe as instruções seguintes e salta imediatamente para a cláusula RECOVER, passando opcionalmente um valor.",
    parametros: [
      { nome: "xValor", tipo: "Qualquer tipo", descricao: "Valor opcional transmitido para a variável de captura da cláusula RECOVER.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Desvio controlado de exceção com Break e Recover
User Function ExBreak()
    Local cMsgErro := ""

    Begin Sequence
        If Empty(cUsuario)
            Break("Usuário obrigatório não informado!")
        EndIf
        ConOut("Processamento realizado com sucesso.")
    Recover Using cMsgErro
        ConOut("Exceção capturada: " + cMsgErro)
    End Sequence
Return`
  },
  {
    nome: "Sleep",
    categoria: "Tipos e Validações",
    sintaxe: "Sleep( <nMilisegundos> )",
    retorno: "NIL",
    descricaoCurta: "Pausa a execução da thread corrente pelo período informado em milissegundos.",
    descricaoDetalhada: "Suspende temporariamente o processamento da thread ativa no AppServer pelo tempo especificado (ex: Sleep(1000) para 1 segundo). Muito utilizada em rotinas de integração, pooling de fila, retentativas com backoff e sincronização de jobs em background.",
    parametros: [
      { nome: "nMilisegundos", tipo: "Numérico", descricao: "Tempo de pausa da thread em milissegundos (ex: 1000 = 1 segundo).", opcional: false }
    ],
    exemplo: `// Exemplo prático: Retentativa com pausa via Sleep
User Function TentaConexao()
    Local nTentativas := 0
    Local lConectou   := .F.

    While nTentativas < 3 .And. !lConectou
        lConectou := U_ConectaWS()
        If !lConectou
            nTentativas++
            ConOut("Falha na tentativa " + Str(nTentativas) + ". Aguardando 2 segundos...")
            Sleep(2000) // Aguarda 2 segundos antes de tentar novamente
        EndIf
    EndDo
Return lConectou`
  }
);
