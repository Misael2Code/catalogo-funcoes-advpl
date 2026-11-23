/**
 * Catalogo de Funcoes ADVPL - Modulo Banco de Dados e Dicionario
 * Funcoes essenciais para navegacao ISAM, bloqueio de registros, parametros e queries
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "DbSelectArea",
    categoria: "Banco de Dados",
    sintaxe: "DbSelectArea( <cAlias> | <nArea> )",
    retorno: "NIL",
    descricaoCurta: "Define e posiciona a area de trabalho ativa para uma tabela informada via alias ou numero.",
    descricaoDetalhada: "Troca o contexto corrente para a tabela especificada. Todas as operacoes subsequentes de posicionamento de registro, leitura de campos e indices atuarao sobre essa area ativa ate que outra seja selecionada.",
    parametros: [
      { nome: "cAlias / nArea", tipo: "Caractere / Numerico", descricao: "Alias da tabela no Protheus (ex: 'SA1', 'SB1') ou numero da area de trabalho.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Selecao de area de clientes e leitura de dados
User Function ExDbSelectArea()
    // Seleciona a tabela de Clientes (SA1)
    DbSelectArea("SA1")
    DbSetOrder(1) // A1_FILIAL + A1_COD + A1_LOJA
    DbGoTop()

    If !SA1->(Eof())
        ConOut("Primeiro Cliente: " + SA1->A1_NOME)
    EndIf
Return`
  },
  {
    nome: "DbSetOrder",
    categoria: "Banco de Dados",
    sintaxe: "DbSetOrder( <nOrdem> )",
    retorno: "NIL",
    descricaoCurta: "Define a ordem de indice ativa para pesquisa e navegacao na tabela selecionada.",
    descricaoDetalhada: "Altera o indice em vigor na area de trabalho ativa. O numero informado corresponde a sequencia dos indices cadastrados na tabela SIX do Dicionario de Dados do Protheus (Indice 1, Indice 2, etc.).",
    parametros: [
      { nome: "nOrdem", tipo: "Numerico", descricao: "Numero da ordem de indice desejada (ex: 1, 2, 3...). Se 0, desativa os indices (ordem natural de gravacao).", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Troca de ordem de pesquisa entre Codigo e CNPJ/CPF
User Function ExDbSetOrder()
    DbSelectArea("SA1")

    // Ordem 1: A1_FILIAL + A1_COD + A1_LOJA
    DbSetOrder(1)
    ConOut("Chave do indice 1: " + IndexKey())

    // Ordem 3: A1_FILIAL + A1_CGC
    DbSetOrder(3)
    ConOut("Chave do indice 3: " + IndexKey())
Return`
  },
  {
    nome: "DbSeek",
    categoria: "Banco de Dados",
    sintaxe: "DbSeek( <expChave>, [<lSoftSeek>], [<lFindLast>] )",
    retorno: "Logico (.T. se encontrou, .F. caso contrario)",
    descricaoCurta: "Pesquisa um registro na tabela ativa com base na chave de indice corrente.",
    descricaoDetalhada: "Executa busca binaria ultra-rapida atraves do indice ativo. Se o registro for localizado, posiciona a tabela no registro e retorna .T. Se nao localizar, posiciona em Eof() e retorna .F. O parametro <lSoftSeek> permite busca por aproximacao.",
    parametros: [
      { nome: "expChave", tipo: "Caractere / Numerico / Data", descricao: "Chave de pesquisa correspondente aos campos do indice ativo.", opcional: false },
      { nome: "lSoftSeek", tipo: "Logico", descricao: "Se .T., posiciona no registro imediatamente posterior caso a chave exata nao seja encontrada (padrao: .F.).", opcional: true },
      { nome: "lFindLast", tipo: "Logico", descricao: "Se .T., busca a ultima ocorrencia da chave informada (padrao: .F.).", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Busca de produto na tabela SB1 considerando a filial
User Function ExDbSeek()
    Local cCodProd := "PROD001"
    Local cFilSB1  := xFilial("SB1")

    DbSelectArea("SB1")
    DbSetOrder(1) // B1_FILIAL + B1_COD

    // Busca concatenando filial e codigo do produto
    If DbSeek(cFilSB1 + cCodProd)
        ConOut("Produto localizado: " + SB1->B1_DESC)
        ConOut("Tipo do produto: " + SB1->B1_TIPO)
    Else
        ConOut("Produto nao cadastrado no sistema!")
    EndIf
Return`
  },
  {
    nome: "RecLock",
    categoria: "Banco de Dados",
    sintaxe: "RecLock( <cAlias>, <lInclusao> )",
    retorno: "Logico (.T. se bloqueio/inclusao bem-sucedida)",
    descricaoCurta: "Bloqueia o registro corrente para alteracao ou prepara o buffer para inclusao.",
    descricaoDetalhada: "Funcao fundamental do Protheus para gravacao de dados. Se <lInclusao> for .T., prepara um novo registro no buffer da tabela. Se for .F., bloqueia o registro atualmente posicionado para alteracao concorrente segura. Toda chamada a RecLock DEVE ser finalizada com MsUnlock().",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela que recebera a gravacao (ex: 'SA1', 'SB1').", opcional: false },
      { nome: "lInclusao", tipo: "Logico", descricao: ".T. para inclusao de novo registro; .F. para alteracao do registro posicionado.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Inclusao de novo cliente e alteracao de registro existente
User Function ExRecLock()
    // 1. Inclusao de um novo registro na tabela de Clientes (SA1)
    DbSelectArea("SA1")
    RecLock("SA1", .T.)
        SA1->A1_FILIAL := xFilial("SA1")
        SA1->A1_COD    := "999999"
        SA1->A1_LOJA   := "01"
        SA1->A1_NOME   := "CLIENTE TESTE RECLOCK"
        SA1->A1_TIPO   := "F"
    MsUnlock()
    ConOut("Novo cliente incluido com sucesso!")

    // 2. Alteracao de registro posicionado
    DbSetOrder(1)
    If DbSeek(xFilial("SA1") + "999999" + "01")
        RecLock("SA1", .F.)
            SA1->A1_NOME := "CLIENTE ALTERADO RECLOCK"
        MsUnlock()
        ConOut("Registro alterado com sucesso!")
    EndIf
Return`
  },
  {
    nome: "MsUnlock",
    categoria: "Banco de Dados",
    sintaxe: "MsUnlock()",
    retorno: "NIL",
    descricaoCurta: "Libera o bloqueio do registro corrente previamente bloqueado pela funcao RecLock.",
    descricaoDetalhada: "Confirma a gravacao fisica dos dados em disco/banco de dados e remove o lock exclusivo do registro na area de trabalho ativa, disponibilizando-o para outros usuarios e threads.",
    parametros: [],
    exemplo: `// Exemplo pratico: Boas praticas com RecLock e MsUnlock
User Function ExMsUnlock()
    DbSelectArea("SB1")
    DbSetOrder(1)

    If DbSeek(xFilial("SB1") + "PROD001")
        If RecLock("SB1", .F.)
            SB1->B1_PRV1 := 120.00 // Atualiza preco de venda
            MsUnlock() // Libera imediatamente o registro
            ConOut("Preco de venda atualizado com sucesso!")
        Else
            ConOut("Nao foi possivel obter bloqueio do registro no momento.")
        EndIf
    EndIf
Return`
  },
  {
    nome: "GetMV",
    categoria: "Banco de Dados",
    sintaxe: "GetMV( <cParametro>, [<lHelp>], [<xPadrao>] )",
    retorno: "Qualquer tipo (conteudo do parametro conforme tipo no SX6)",
    descricaoCurta: "Obtem e retorna o conteudo de um parametro do sistema Protheus cadastrado na tabela SX6.",
    descricaoDetalhada: "Carrega da tabela SX6 do dicionario de dados o valor de um parametro de configuracao (como MV_ESTADO, MV_PAR01, etc.). Se o parametro for tipo caractere, numerico, logico ou data, GetMV ja retorna a variavel devidamente tipada.",
    parametros: [
      { nome: "cParametro", tipo: "Caractere", descricao: "Nome do parametro cadastrado no SX6 (ex: 'MV_ESTADO').", opcional: false },
      { nome: "lHelp", tipo: "Logico", descricao: "Indica se deve disparar a tela de Help de dicionario caso o parametro nao exista (padrao: .F.).", opcional: true },
      { nome: "xPadrao", tipo: "Qualquer tipo", descricao: "Valor padrao retornado caso o parametro nao seja encontrado no SX6.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Leitura de parametros do sistema no Protheus
User Function ExGetMV()
    Local cEstadoEmp  := GetMV("MV_ESTADO")       // Parametro tipo Caractere
    Local nCasasDec   := GetMV("MV_CENT", , 2)    // Retorna casas decimais com valor default
    Local lGeraLanc   := GetMV("MV_ATUCONT", , .F.)// Parametro tipo Logico

    ConOut("Estado configurado: " + cEstadoEmp)
    ConOut("Casas decimais: " + cValToChar(nCasasDec))
    ConOut("Gera lancamento contabil: " + cValToChar(lGeraLanc))
Return`
  },
  {
    nome: "PutMV",
    categoria: "Banco de Dados",
    sintaxe: "PutMV( <cParametro>, <xConteudo> )",
    retorno: "Logico (.T. se gravado com sucesso)",
    descricaoCurta: "Grava ou atualiza o conteudo de um parametro do sistema na tabela SX6.",
    descricaoDetalhada: "Atualiza o conteudo do parametro informado na tabela SX6 no banco de dados. Modifica o valor respeitando as regras de compartilhamento de tabelas/filiais do Protheus.",
    parametros: [
      { nome: "cParametro", tipo: "Caractere", descricao: "Nome do parametro a ser modificado no SX6.", opcional: false },
      { nome: "xConteudo", tipo: "Qualquer tipo", descricao: "Novo conteudo a ser gravado (compativel com o tipo original do parametro).", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Atualizacao de parametro de controle sequencial ou configuracao
User Function ExPutMV()
    Local cNovoValor := "SP"
    Local lSucesso   := .F.

    // Atualiza parametro de estado
    lSucesso := PutMV("MV_ESTADO", cNovoValor)

    If lSucesso
        ConOut("Parametro MV_ESTADO atualizado com sucesso para: " + cNovoValor)
    Else
        ConOut("Falha ao gravar alteracao no parametro SX6!")
    EndIf
Return`
  },
  {
    nome: "TCQuery",
    categoria: "Banco de Dados",
    sintaxe: "TCQuery( <cQuery>, <cAlias>, [<nFlags>] )",
    retorno: "Numerico (0 se sucesso ou codigo de erro TC)",
    descricaoCurta: "Executa uma sentenca SQL direta no banco via TOPConnect/DBAccess, criando um cursor.",
    descricaoDetalhada: "Envia uma consulta SQL (SELECT) para o banco de dados atraves da camada DBAccess/TOPConnect e vincula os dados retornados a um alias temporario de memoria. O alias criado pode ser percorrido como uma tabela comum usando DbGoTop(), DbSkip() e Eof().",
    parametros: [
      { nome: "cQuery", tipo: "Caractere", descricao: "Sentenca SQL no padrao ANSI compatível com DBAccess.", opcional: false },
      { nome: "cAlias", tipo: "Caractere", descricao: "Nome do alias temporario a ser criado (ex: 'TMPQRY').", opcional: false },
      { nome: "nFlags", tipo: "Numerico", descricao: "Flags adicionais de processamento TOPConnect.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Consulta customizada em clientes com TOPConnect
User Function ExTCQuery()
    Local cAliasQry := GetNextAlias()
    Local cQuery    := ""

    cQuery := "SELECT A1_COD, A1_NOME, A1_EST "
    cQuery += "FROM " + RetSqlName("SA1") + " "
    cQuery += "WHERE A1_EST = 'SP' "
    cQuery += "AND D_E_L_E_T_ = ' ' "
    cQuery += "ORDER BY A1_NOME"

    // Executa a query criando a area de trabalho temporaria
    TCQuery cQuery ALIAS (cAliasQry) NEW

    // Percorre os resultados do cursor SQL
    (cAliasQry)->(DbGoTop())
    While !(cAliasQry)->(Eof())
        ConOut("Cliente: " + (cAliasQry)->A1_COD + " - " + (cAliasQry)->A1_NOME)
        (cAliasQry)->(DbSkip())
    EndDo

    // Fecha o cursor temporario
    (cAliasQry)->(DbCloseArea())
Return`
  }
);
