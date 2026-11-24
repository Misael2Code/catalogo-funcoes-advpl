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
  },
  {
    nome: "EoF",
    categoria: "Banco de Dados",
    sintaxe: "EoF()",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se o ponteiro de registros ultrapassou o último registro da tabela ativa (End of File).",
    descricaoDetalhada: "Retorna .T. quando o ponteiro atinge o fim da tabela (após o último registro físico ou lógico com índice ativo) ou se a tabela estiver vazia. Essencial para controle de laços de repetição While !Eof().",
    parametros: [],
    exemplo: `// Exemplo prático: Varredura de registros com controle de fim de arquivo
User Function ExEoF()
    DbSelectArea("SA1")
    DbSetOrder(1)
    DbGoTop()

    While !SA1->(Eof())
        ConOut("Cliente: " + SA1->A1_COD + " - " + SA1->A1_NOME)
        SA1->(DbSkip())
    EndDo
Return`
  },
  {
    nome: "BoF",
    categoria: "Banco de Dados",
    sintaxe: "BoF()",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se o ponteiro de registros ultrapassou o início da tabela ativa (Beginning of File).",
    descricaoDetalhada: "Retorna .T. quando uma tentativa de movimentação para trás (DbSkip(-1)) ultrapassa o primeiro registro ou caso a tabela esteja totalmente vazia.",
    parametros: [],
    exemplo: `// Exemplo prático: Verificação de início de tabela
User Function ExBoF()
    DbSelectArea("SA1")
    DbGoTop()
    DbSkip(-1) // Força tentativa de recuo antes do primeiro registro

    If BoF()
        ConOut("Ponteiro atingiu o início da tabela (BoF atingido).")
    EndIf
Return`
  },
  {
    nome: "DbSkip",
    categoria: "Banco de Dados",
    sintaxe: "DbSkip( [<nRegistros>] )",
    retorno: "NIL",
    descricaoCurta: "Move o ponteiro da área de trabalho ativa uma ou mais posições para frente ou para trás.",
    descricaoDetalhada: "Avança ou recua o ponteiro de registros na tabela ativa. Se <nRegistros> for omitido, avança 1 registro. Se positivo, avança N registros; se negativo, retrocede N registros respeitando o índice ativo.",
    parametros: [
      { nome: "nRegistros", tipo: "Numérico", descricao: "Quantidade de registros a saltar (positivo para avançar, negativo para recuar). Padrão: 1.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Navegação avançando e recuando registros
User Function ExDbSkip()
    DbSelectArea("SB1")
    DbGoTop()

    // Avança 1 registro
    DbSkip()

    // Retrocede 1 registro
    DbSkip(-1)

    // Salta 5 registros para frente
    DbSkip(5)
Return`
  },
  {
    nome: "DbGoTop",
    categoria: "Banco de Dados",
    sintaxe: "DbGoTop()",
    retorno: "NIL",
    descricaoCurta: "Posiciona o ponteiro de registros no primeiro registro lógico da tabela na área ativa.",
    descricaoDetalhada: "Move o ponteiro para o primeiro registro da tabela considerando a ordem do índice ativo e quaisquer filtros aplicados.",
    parametros: [],
    exemplo: `// Exemplo prático: Posicionamento no primeiro registro
User Function ExDbGoTop()
    DbSelectArea("SA1")
    DbSetOrder(1) // Filial + Código + Loja
    DbGoTop()

    If !Eof()
        ConOut("Primeiro cliente da tabela: " + SA1->A1_COD + " - " + SA1->A1_NOME)
    EndIf
Return`
  },
  {
    nome: "DbGoBottom",
    categoria: "Banco de Dados",
    sintaxe: "DbGoBottom()",
    retorno: "NIL",
    descricaoCurta: "Posiciona o ponteiro de registros no último registro lógico da tabela na área ativa.",
    descricaoDetalhada: "Move o ponteiro para o último registro válido da tabela, respeitando a ordem do índice selecionado e os filtros em vigor.",
    parametros: [],
    exemplo: `// Exemplo prático: Localização do último registro cadastrado
User Function ExDbGoBottom()
    DbSelectArea("SA1")
    DbSetOrder(1)
    DbGoBottom()

    If !Bof()
        ConOut("Último cliente ordenado: " + SA1->A1_COD + " - " + SA1->A1_NOME)
    EndIf
Return`
  },
  {
    nome: "DbGoTo",
    categoria: "Banco de Dados",
    sintaxe: "DbGoTo( <nRecNo> )",
    retorno: "NIL",
    descricaoCurta: "Posiciona o ponteiro de registros diretamente no registro físico identificado pelo número de RecNo.",
    descricaoDetalhada: "Acesso direto e instantâneo ao registro físico correspondente à coluna R_E_C_N_O_ no banco de dados relacional.",
    parametros: [
      { nome: "nRecNo", tipo: "Numérico", descricao: "Número do registro físico (RecNo) para posicionamento direto.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Posicionamento direto via RecNo salvo
User Function ExDbGoTo()
    Local nRecSalvo := 1540

    DbSelectArea("SA1")
    DbGoTo(nRecSalvo)

    If !Eof()
        ConOut("Cliente no RecNo " + cValToChar(nRecSalvo) + ": " + SA1->A1_NOME)
    EndIf
Return`
  },
  {
    nome: "RecNo",
    categoria: "Banco de Dados",
    sintaxe: "RecNo()",
    retorno: "Numérico",
    descricaoCurta: "Retorna o número de registro físico (R_E_C_N_O_) corrente na área de trabalho ativa.",
    descricaoDetalhada: "Obtém o identificador numérico único e sequencial do registro físico corrente no banco de dados Protheus.",
    parametros: [],
    exemplo: `// Exemplo prático: Captura de RecNo para operações posteriores
User Function ExRecNo()
    Local nRecAtual := 0

    DbSelectArea("SA1")
    DbSetOrder(1)
    If DbSeek(xFilial("SA1") + "00000101")
        nRecAtual := RecNo()
        ConOut("RecNo do cliente localizado: " + cValToChar(nRecAtual))
    EndIf
Return`
  },
  {
    nome: "Deleted",
    categoria: "Banco de Dados",
    sintaxe: "Deleted()",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se o registro corrente na área de trabalho ativa está marcado como deletado.",
    descricaoDetalhada: "Verifica se o campo de controle D_E_L_E_T_ possui asterisco ('*') indicando que o registro foi excluído logicamente.",
    parametros: [],
    exemplo: `// Exemplo prático: Verificação de exclusão lógica
User Function ExDeleted()
    DbSelectArea("SA1")
    If Deleted()
        ConOut("O registro posicionado está marcado como deletado.")
    Else
        ConOut("Registro ativo e válido.")
    EndIf
Return`
  },
  {
    nome: "DbCloseArea",
    categoria: "Banco de Dados",
    sintaxe: "DbCloseArea()",
    retorno: "NIL",
    descricaoCurta: "Fecha a área de trabalho da tabela ativa ou especificada liberando recursos.",
    descricaoDetalhada: "Fecha a tabela ou cursor temporário aberto na área de trabalho, desassociando o alias e liberando buffers de memória.",
    parametros: [],
    exemplo: `// Exemplo prático: Fechamento de área de trabalho e cursor temporário
User Function ExDbCloseArea()
    Local cAliasTmp := GetNextAlias()

    TCQuery "SELECT A1_COD FROM SA1990 WHERE D_E_L_E_T_ = ' '" ALIAS (cAliasTmp) NEW
    (cAliasTmp)->(DbCloseArea())
    ConOut("Cursor temporário fechado com sucesso.")
Return`
  },
  {
    nome: "Select",
    categoria: "Banco de Dados",
    sintaxe: "Select( [<cAlias>] )",
    retorno: "Numérico",
    descricaoCurta: "Retorna o número da área de trabalho associada ao alias informado ou da área ativa.",
    descricaoDetalhada: "Retorna o identificador numérico da área de trabalho ativa ou do alias especificado. Se o alias não estiver aberto, retorna 0.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela cuja área de trabalho se deseja verificar.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Verificação de tabela aberta
User Function ExSelect()
    Local nAreaSA1 := Select("SA1")

    If nAreaSA1 > 0
        ConOut("Tabela SA1 aberta na área: " + cValToChar(nAreaSA1))
    Else
        ConOut("Tabela SA1 não está aberta no momento.")
    EndIf
Return`
  },
  {
    nome: "GetArea",
    categoria: "Banco de Dados",
    sintaxe: "GetArea()",
    retorno: "Array",
    descricaoCurta: "Salva o estado e posicionamento da área de trabalho corrente (alias, índice e RecNo).",
    descricaoDetalhada: "Retorna um array estruturado contendo { Alias(), IndexOrd(), RecNo() }. Indispensável para preservar o contexto antes de rotinas de consulta secundárias, gatilhos e pontos de entrada.",
    parametros: [],
    exemplo: `// Exemplo prático: Preservação de contexto com GetArea e RestArea
User Function ExGetArea()
    Local aArea := GetArea() // Salva contexto corrente

    // Realiza consultas ou atualizações em outras tabelas
    DbSelectArea("SB1")
    DbSeek(xFilial("SB1") + "PROD001")

    RestArea(aArea) // Restaura com precisão o estado original
Return`
  },
  {
    nome: "RestArea",
    categoria: "Banco de Dados",
    sintaxe: "RestArea( <aArea> )",
    retorno: "NIL",
    descricaoCurta: "Restaura o estado e posicionamento de uma área previamente salva com GetArea().",
    descricaoDetalhada: "Recebe o vetor gerado por GetArea() e restaura a tabela ativa, a ordem de índice selecionada e o registro posicionado (RecNo).",
    parametros: [
      { nome: "aArea", tipo: "Array", descricao: "Array retornado previamente pela função GetArea().", opcional: false }
    ],
    exemplo: `// Exemplo prático: Restauração de contexto de navegação
User Function ExRestArea()
    Local aAreaAnt := GetArea()

    // Consulta em tabela de parâmetros ou dados auxiliares
    DbSelectArea("SX6")
    DbSetOrder(1)

    // Restaura fielmente a tabela, índice e registro onde o usuário estava
    RestArea(aAreaAnt)
Return`
  },
  {
    nome: "DbSetFilter",
    categoria: "Banco de Dados",
    sintaxe: "DbSetFilter( <bFiltro>, [<cFiltro>] )",
    retorno: "NIL",
    descricaoCurta: "Aplica um filtro temporário nos registros da tabela ativa com base em um bloco de código ou expressão.",
    descricaoDetalhada: "Estabelece uma condição de filtragem lógica na área de trabalho selecionada. Todos os comandos de navegação subsequentes (DbSkip, DbGoTop, etc.) ignoram os registros que não satisfazem a condição até que DbClearFilter() seja invocado.",
    parametros: [
      { nome: "bFiltro", tipo: "Bloco de Código", descricao: "Condição lógica a ser avaliada para cada registro (ex: {|| SA1->A1_EST == 'SP'}).", opcional: false },
      { nome: "cFiltro", tipo: "Caractere", descricao: "Expressão textual equivalente do filtro para documentação ou exibição.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Aplicação de filtro temporário de clientes de SP
User Function ExDbSetFilter()
    DbSelectArea("SA1")
    DbSetOrder(1)

    // Filtra apenas clientes do estado de SP
    DbSetFilter({|| SA1->A1_EST == "SP"}, "A1_EST == 'SP'")
    DbGoTop()

    While !SA1->(Eof())
        ConOut("Cliente SP: " + SA1->A1_NOME)
        SA1->(DbSkip())
    EndDo

    // Remove o filtro da área
    DbClearFilter()
Return`
  },
  {
    nome: "DbClearFilter",
    categoria: "Banco de Dados",
    sintaxe: "DbClearFilter()",
    retorno: "NIL",
    descricaoCurta: "Remove o filtro temporário previamente aplicado à área de trabalho ativa com DbSetFilter().",
    descricaoDetalhada: "Desativa qualquer condição de filtragem em vigor na área selecionada, permitindo que a navegação volte a enxergar todos os registros ativos da tabela.",
    parametros: [],
    exemplo: `// Exemplo prático: Limpeza de filtro ativo após processamento
User Function ExDbClearFilter()
    DbSelectArea("SB1")
    DbSetFilter({|| SB1->B1_TIPO == "PA"}, "B1_TIPO == 'PA'")

    // Processamento com filtro...
    U_ProcessaProdutos()

    // Restaura visão total da tabela
    DbClearFilter()
    ConOut("Filtro removido. Todos os produtos visíveis novamente.")
Return`
  },
  {
    nome: "DbSkipper",
    categoria: "Banco de Dados",
    sintaxe: "DbSkipper( [<nRegistros>] )",
    retorno: "Numérico (Quantidade real de registros movimentados)",
    descricaoCurta: "Movimenta o ponteiro de registros na tabela ativa e retorna quantos registros foram efetivamente saltados.",
    descricaoDetalhada: "Função de navegação de baixo nível muito utilizada por componentes de interface (TBrowse, MsSelect, Grids). Salta nRegistros para frente (positivo) ou para trás (negativo), parando automaticamente ao atingir EoF ou BoF e retornando a contagem de registros percorridos.",
    parametros: [
      { nome: "nRegistros", tipo: "Numérico", descricao: "Quantidade de registros a saltar (positivo ou negativo). Padrão: 1.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Navegação de bloco de registros com DbSkipper
User Function ExDbSkipper()
    Local nMovidos := 0

    DbSelectArea("SA1")
    DbSetOrder(1)
    DbGoTop()

    // Avança até 10 registros na tabela
    nMovidos := DbSkipper(10)
    ConOut("Registros avançados com sucesso: " + cValToChar(nMovidos))
Return`
  },
  {
    nome: "Found",
    categoria: "Banco de Dados",
    sintaxe: "Found()",
    retorno: "Lógico (.T. se o registro foi localizado, .F. caso contrário)",
    descricaoCurta: "Retorna se a última pesquisa de chave (DbSeek) localizou com sucesso um registro correspondente.",
    descricaoDetalhada: "Avalia o resultado da última busca indexada realizada na área ativa. Retorna .T. se a chave de pesquisa foi encontrada ou .F. se nenhum registro correspondeu à busca.",
    parametros: [],
    exemplo: `// Exemplo prático: Validação de busca com Found()
User Function ExFound()
    DbSelectArea("SA1")
    DbSetOrder(1)

    DbSeek(xFilial("SA1") + "00000101")
    If Found()
        ConOut("Cliente localizado: " + SA1->A1_NOME)
    Else
        ConOut("Cliente não cadastrado na base de dados.")
    EndIf
Return`
  },
  {
    nome: "Alias",
    categoria: "Banco de Dados",
    sintaxe: "Alias( [<nArea>] )",
    retorno: "Caractere (Nome do alias da área de trabalho)",
    descricaoCurta: "Retorna o alias (identificador da tabela) da área de trabalho ativa ou da área indicada pelo número.",
    descricaoDetalhada: "Obtém a identificação textual da tabela aberta no contexto de trabalho (ex: 'SA1', 'SB1', 'SC5'). Se informado o número da workarea, retorna o alias daquela área específica.",
    parametros: [
      { nome: "nArea", tipo: "Numérico", descricao: "Número da área de trabalho a consultar. Padrão: área ativa.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Identificação dinâmica da tabela ativa
User Function ExAlias()
    DbSelectArea("SC5")
    ConOut("Área de trabalho atual: " + Alias()) // Retorna 'SC5'

    DbSelectArea("SC6")
    ConOut("Nova área selecionada: " + Alias()) // Retorna 'SC6'
Return`
  },
  {
    nome: "IndexOrd",
    categoria: "Banco de Dados",
    sintaxe: "IndexOrd()",
    retorno: "Numérico (Número da ordem do índice ativo)",
    descricaoCurta: "Retorna o número da ordem de índice ativa na tabela corrente (1 para índice primário, 2 para secundário, etc.).",
    descricaoDetalhada: "Informa qual índice do SIX está atualmente em uso para a navegação e busca na área ativa. Retorna 0 caso a tabela esteja em ordem natural de gravação (sem índice).",
    parametros: [],
    exemplo: `// Exemplo prático: Verificação da ordem de índice em vigor
User Function ExIndexOrd()
    DbSelectArea("SA1")
    DbSetOrder(2) // Ordem por Nome

    If IndexOrd() == 2
        ConOut("Tabela SA1 posicionada na ordem por Nome do Cliente.")
    EndIf
Return`
  },
  {
    nome: "IndexKey",
    categoria: "Banco de Dados",
    sintaxe: "IndexKey( [<nOrdem>] )",
    retorno: "Caractere (Expressão ADVPL que compõe a chave do índice)",
    descricaoCurta: "Retorna a expressão ADVPL que define a composição da chave do índice ativo ou da ordem indicada.",
    descricaoDetalhada: "Retorna a string com os campos e expressões que formam o índice (ex: 'A1_FILIAL+A1_COD+A1_LOJA'). Fundamental para montar strings de chave de busca para DbSeek de forma genérica e segura.",
    parametros: [
      { nome: "nOrdem", tipo: "Numérico", descricao: "Número da ordem de índice a consultar. Padrão: ordem ativa.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Consulta dinâmica da chave de índice
User Function ExIndexKey()
    DbSelectArea("SB1")
    DbSetOrder(1)

    ConOut("Expressão da chave primária do SB1: " + IndexKey(1))
    // Retorna: B1_FILIAL+B1_COD
Return`
  },
  {
    nome: "ChangeQuery",
    categoria: "Banco de Dados",
    sintaxe: "ChangeQuery( <cQuery> )",
    retorno: "Caractere (Instrução SQL adaptada ao dialeto do SGBD)",
    descricaoCurta: "Converte uma instrução SQL padrão do Protheus para a sintaxe nativa do banco de dados relacional ativo.",
    descricaoDetalhada: "Função essencial de compatibilidade entre bancos de dados (Oracle, SQL Server, PostgreSQL). Traduz comandos e funções genéricas (como SUBSTR, D_E_L_E_T_, NVL) para as funções equivalentes do dialeto específico do SGBD configurado no DBAccess.",
    parametros: [
      { nome: "cQuery", tipo: "Caractere", descricao: "Comando SQL padrão Protheus que será adaptado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Adaptação de consulta SQL com ChangeQuery
User Function ExChangeQuery()
    Local cQuery := ""

    cQuery := "SELECT A1_COD, A1_NOME FROM " + RetSqlName("SA1") + " "
    cQuery += "WHERE D_E_L_E_T_ = ' ' AND A1_EST = 'SP'"

    // Adapta para o banco relacional em uso (Oracle, MSSQL, Postgres)
    cQuery := ChangeQuery(cQuery)

    TCQuery cQuery New Alias "TMPCLI"
    TCSetField("TMPCLI", "A1_COD", "C", 6, 0)
    TCSetField("TMPCLI", "A1_NOME", "C", 40, 0)
Return`
  },
  {
    nome: "TcSqlError",
    categoria: "Banco de Dados",
    sintaxe: "TcSqlError()",
    retorno: "Caractere (Mensagem descritiva de erro retornada pelo banco)",
    descricaoCurta: "Retorna a mensagem de erro detalhada devolvida pelo banco de dados relacional após uma falha no DBAccess/TopConnect.",
    descricaoDetalhada: "Obtém a descrição exata do erro ocorrido na última execução de instrução SQL via TCSQLExec() ou falha de conexão com o banco de dados. Fundamental para diagnóstico e gravação de logs de integração.",
    parametros: [],
    exemplo: `// Exemplo prático: Captura de erro em execução SQL direta
User Function ExTcSqlError()
    Local cSql := "UPDATE " + RetSqlName("SB1") + " SET B1_PRV1 = 0 WHERE B1_COD = 'INEXISTENTE'"
    Local nStatus := TCSQLExec(cSql)

    If nStatus < 0
        ConOut("Falha na execução SQL! Detalhe do banco: " + TcSqlError())
    Else
        ConOut("Comando SQL executado com sucesso.")
    EndIf
Return`
  },
  {
    nome: "DbCreateIndex",
    categoria: "Banco de Dados",
    sintaxe: "DbCreateIndex( <cNomeIndice>, <cChave>, [<bChave>], [<lExclusivo>] )",
    retorno: "NIL",
    descricaoCurta: "Cria um índice temporário ou definitivo em tempo de execução para a área de trabalho ativa.",
    descricaoDetalhada: "Gera um índice sob demanda para a tabela selecionada, ordenando os registros com base na expressão de chave informada. Muito utilizado na criação de relatórios ou telas com ordenações temporárias customizadas.",
    parametros: [
      { nome: "cNomeIndice", tipo: "Caractere", descricao: "Nome do arquivo temporário de índice a ser criado.", opcional: false },
      { nome: "cChave", tipo: "Caractere", descricao: "Expressão em string dos campos que compõem a chave (ex: 'A1_EST+A1_NOME').", opcional: false },
      { nome: "bChave", tipo: "Bloco de Código", descricao: "Bloco de código equivalente para indexação.", opcional: true },
      { nome: "lExclusivo", tipo: "Lógico", descricao: "Se .T., cria índice único (ignora duplicados). Padrão: .F.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de índice temporário para ordenação personalizada
User Function ExDbCreateIndex()
    Local cTmpInd := CriaTrab(Nil, .F.)

    DbSelectArea("SA1")
    // Cria índice temporário por UF + Razão Social
    DbCreateIndex(cTmpInd, "A1_EST + A1_NOME", {|| SA1->A1_EST + SA1->A1_NOME})
    DbGoTop()

    While !SA1->(Eof())
        ConOut("UF: " + SA1->A1_EST + " - Cliente: " + SA1->A1_NOME)
        SA1->(DbSkip())
    EndDo
Return`
  },
  {
    nome: "Begin Transaction",
    categoria: "Banco de Dados",
    sintaxe: "Begin Transaction ... End Transaction",
    retorno: "NIL",
    descricaoCurta: "Inicia um bloco de transação atômica no banco de dados relacional e arquivos locais.",
    descricaoDetalhada: "Comando fundamental de controle transacional no Protheus. Assegura que todas as alterações e gravações realizadas entre o Begin Transaction e o End Transaction sejam tratadas como uma única unidade lógica de trabalho (ACID). Se ocorrer qualquer falha crítica ou chamada a DisarmTransaction(), todas as operações são revertidas (rollback automático).",
    parametros: [],
    exemplo: `// Exemplo prático: Transação atômica de pedido e itens com Begin Transaction
User Function GravaPedido()
    Local lSucesso := .T.

    Begin Transaction
        // Gravação do cabeçalho
        DbSelectArea("SC5")
        RecLock("SC5", .T.)
        SC5->C5_NUM := "000100"
        MsUnlock()

        // Gravação dos itens
        DbSelectArea("SC6")
        RecLock("SC6", .T.)
        SC6->C6_NUM := "000100"
        MsUnlock()

        If !lSucesso
            DisarmTransaction() // Cancela alterações em caso de erro
        EndIf
    End Transaction
Return`
  },
  {
    nome: "End Transaction",
    categoria: "Banco de Dados",
    sintaxe: "End Transaction",
    retorno: "NIL",
    descricaoCurta: "Finaliza e confirma definitivamente a transação aberta pelo Begin Transaction (commit).",
    descricaoDetalhada: "Encerra com sucesso o bloco transacional, persistindo permanentemente todas as operações pendentes no banco de dados e liberando os bloqueios mantidos durante a transação.",
    parametros: [],
    exemplo: `// Exemplo prático: Fechamento com confirmação de transação
User Function ConfirmaTransacao()
    Begin Transaction
        // Atualizações críticas...
        ConOut("Processando dados protegidos por transação...")
    End Transaction // Realiza o COMMIT definitivo no banco
    ConOut("Transação comitada com sucesso.")
Return`
  },
  {
    nome: "DisarmTransaction",
    categoria: "Banco de Dados",
    sintaxe: "DisarmTransaction()",
    retorno: "NIL",
    descricaoCurta: "Desarma a transação corrente, forçando o rollback de todas as alterações ao atingir End Transaction.",
    descricaoDetalhada: "Sinaliza ao motor do Protheus que a transação ativa não deve ser confirmada. Ao alcançar o comando End Transaction subsequente, o sistema executará automaticamente o rollback de todas as tabelas e registros manipulados no bloco.",
    parametros: [],
    exemplo: `// Exemplo prático: Desarme de transação ao detectar inconsistência de dados
User Function ExDisarmTransaction()
    Begin Transaction
        DbSelectArea("SB2")
        RecLock("SB2", .F.)
        SB2->B2_QATU -= 10
        MsUnlock()

        // Valida se o saldo ficou negativo indevidamente
        If SB2->B2_QATU < 0
            DisarmTransaction() // Força cancelamento total
            ConOut("Transação desarmada! Saldo não pode ficar negativo.")
        EndIf
    End Transaction
Return`
  },
  {
    nome: "SimpleLock",
    categoria: "Banco de Dados",
    sintaxe: "SimpleLock()",
    retorno: "Lógico (.T. se bloqueado com sucesso, .F. caso contrário)",
    descricaoCurta: "Tenta efetuar o bloqueio do registro corrente de forma simplificada sem interface de espera.",
    descricaoDetalhada: "Tenta bloquear o registro na tabela ativa para atualização exclusiva. Retorna imediatamente .F. caso o registro já esteja bloqueado por outro usuário ou thread, evitando paradas indesejadas na execução de rotinas automáticas.",
    parametros: [],
    exemplo: `// Exemplo prático: Bloqueio sem espera para atualização rápida
User Function ExSimpleLock()
    DbSelectArea("SA1")

    If SimpleLock()
        SA1->A1_NOME := "NOME ATUALIZADO"
        MsUnlock()
        ConOut("Registro alterado com sucesso.")
    Else
        ConOut("Registro ocupado por outro usuário no momento.")
    EndIf
Return`
  },
  {
    nome: "MsRLock",
    categoria: "Banco de Dados",
    sintaxe: "MsRLock( [<nRecNo>] )",
    retorno: "Lógico (.T. se bloqueado com sucesso, .F. se timeout ou bloqueado)",
    descricaoCurta: "Aplica bloqueio de registro (RLock) com controle de concorrência e tentativas automáticas do Protheus.",
    descricaoDetalhada: "Rotina padrão do Framework Protheus para lock de registro. Tenta obter exclusividade sobre o registro indicado (ou corrente) efetuando tentativas com intervalo de espera antes de desistir, garantindo maior estabilidade que o RLock puro do Clipper.",
    parametros: [
      { nome: "nRecNo", tipo: "Numérico", descricao: "Número do RecNo a bloquear (padrão: registro corrente posicionado).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Bloqueio seguro de registro com retentativas do Protheus
User Function ExMsRLock()
    DbSelectArea("SC5")

    If MsRLock(SC5->(RecNo()))
        SC5->C5_LIBEROK := "S"
        MsRUnlock(SC5->(RecNo()))
        ConOut("Pedido liberado com segurança.")
    EndIf
Return`
  },
  {
    nome: "MsRUnlock",
    categoria: "Banco de Dados",
    sintaxe: "MsRUnlock( [<nRecNo>] )",
    retorno: "NIL",
    descricaoCurta: "Libera o bloqueio de registro previamente obtido por MsRLock() ou RecLock().",
    descricaoDetalhada: "Desfaz a trava exclusiva sobre o registro especificado na tabela corrente, tornando-o novamente disponível para alteração por outras threads ou operadores no Protheus.",
    parametros: [
      { nome: "nRecNo", tipo: "Numérico", descricao: "Número do RecNo a desbloquear (padrão: registro corrente).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Liberação explícita de bloqueio de registro
User Function ExMsRUnlock()
    DbSelectArea("SB1")
    If MsRLock()
        // Executa atualização...
        MsRUnlock() // Libera imediatamente o bloqueio
    EndIf
Return`
  },
  {
    nome: "SoftLock",
    categoria: "Banco de Dados",
    sintaxe: "SoftLock( <cAlias> )",
    retorno: "Lógico (.T. se obteve o semáforo, .F. caso já esteja bloqueado)",
    descricaoCurta: "Cria um bloqueio lógico (semáforo de concorrência) sem travar fisicamente a linha no SGBD.",
    descricaoDetalhada: "Utilizado principalmente em rotinas de tela e cadastros do Protheus para sinalizar que determinado registro está sendo editado por um usuário, evitando que outro operador inicie a edição simultânea, sem manter locks longos no SGBD.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela cujo registro corrente receberá o semáforo.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Criação de semáforo de tela com SoftLock
User Function ExSoftLock()
    DbSelectArea("SA1")

    If SoftLock("SA1")
        ConOut("Semáforo obtido com sucesso! Abrindo tela para edição...")
        // Abre tela de edição...
    Else
        MsgAlert("Este cliente já está em manutenção por outro operador!", "Aviso")
    EndIf
Return`
  },
  {
    nome: "DbRLock",
    categoria: "Banco de Dados",
    sintaxe: "DbRLock( [<nRecNo>] )",
    retorno: "Lógico (.T. se o registro foi bloqueado, .F. caso contrário)",
    descricaoCurta: "Função oficial do RDD para bloqueio do registro especificado pelo seu número de RecNo.",
    descricaoDetalhada: "Comando nativo da camada RDD/DBAccess que solicita o bloqueio exclusivo de um registro na área de trabalho ativa. Aceita como parâmetro o número do registro a ser travado sem necessidade de posicionamento prévio.",
    parametros: [
      { nome: "nRecNo", tipo: "Numérico", descricao: "Identificador físico (RecNo) do registro a ser bloqueado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Bloqueio direto via RDD com DbRLock
User Function ExDbRLock()
    DbSelectArea("SB1")

    If DbRLock(150)
        ConOut("Registro 150 bloqueado com sucesso na camada RDD.")
        DbRUnlock(150)
    EndIf
Return`
  }
);
