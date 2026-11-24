/**
 * Catalogo de Funcoes ADVPL - Modulo Relatorios e Impressao
 * Funcoes e classes essenciais para relatorios TReport, impressao grafica FWMsPrinter e relatorios legados
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "TReport",
    categoria: "Relatórios e Impressão",
    sintaxe: "TReport():New( <cReport>, <cTitle>, [<uParam>], [<bAction>], [<cDescription>] )",
    retorno: "Objeto (Instância da classe TReport)",
    descricaoCurta: "Classe padrão do Framework TOTVS para criação e gerenciamento de relatórios personalizáveis e gráficos.",
    descricaoDetalhada: "Principal classe para desenvolvimento de relatórios no Protheus. Oferece interface visual integrada para o usuário definir filtros, ordenações, colunas visíveis, totalizadores e formatos de exportação (PDF, Planilha Excel, Gráfico, Impressão em spool).",
    parametros: [
      { nome: "cReport", tipo: "Caractere", descricao: "Nome identificador interno do relatório (ex: 'MEUREP').", opcional: false },
      { nome: "cTitle", tipo: "Caractere", descricao: "Título exibido no cabeçalho e na interface de impressão.", opcional: false },
      { nome: "uParam", tipo: "Caractere / Array", descricao: "Nome do grupo de perguntas do SX1 associado para filtros.", opcional: true },
      { nome: "bAction", tipo: "Bloco de Código", descricao: "Bloco de código executado para processamento e impressão das seções.", opcional: true },
      { nome: "cDescription", tipo: "Caractere", descricao: "Descrição detalhada do relatório exibida ao usuário.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de relatório estruturado com TReport
User Function RelClientes()
    Local oReport := Nil

    oReport := TReport():New("RELCLI", "Listagem Cadastral de Clientes", "MTR010", {|oReport| ReportPrint(oReport)}, "Emite a relação de clientes ativos.")
    oReport:SetLandscape() // Orientação paisagem

    // Define a seção do relatório
    TRSection():New(oReport, "Clientes", {"SA1"})

    oReport:PrintDialog()
Return

Static Function ReportPrint(oReport)
    Local oSection := oReport:Section(1)

    DbSelectArea("SA1")
    DbSetOrder(1)
    DbGoTop()

    oReport:SetMeter(SA1->(LastRec()))
    oSection:Init()

    While !SA1->(Eof())
        If oReport:Cancel()
            Exit
        EndIf

        oReport:IncMeter()
        oSection:PrintLine()
        SA1->(DbSkip())
    EndDo

    oSection:Finish()
Return`
  },
  {
    nome: "TRSection",
    categoria: "Relatórios e Impressão",
    sintaxe: "TRSection():New( <oReport>, <cTitle>, [<uTable>], [<aOrder>], [<lLoadCells>] )",
    retorno: "Objeto (Instância da classe TRSection)",
    descricaoCurta: "Cria e gerencia uma seção de dados estruturada dentro de um objeto de relatório da classe TReport.",
    descricaoDetalhada: "Define uma banda ou seção de impressão vinculada a uma tabela do banco de dados ou consulta SQL. Uma seção agrupa células (TRCell), quebras e totalizadores (TRFunction), podendo conter seções filhas aninhadas.",
    parametros: [
      { nome: "oReport", tipo: "Objeto", descricao: "Objeto pai instanciado da classe TReport ou TRSection superior.", opcional: false },
      { nome: "cTitle", tipo: "Caractere", descricao: "Título descritivo da seção na interface do relatório.", opcional: false },
      { nome: "uTable", tipo: "Caractere / Array", descricao: "Alias da tabela principal (ex: 'SA1') ou lista de tabelas.", opcional: true },
      { nome: "aOrder", tipo: "Array", descricao: "Vetor com os índices disponíveis para ordenação da seção.", opcional: true },
      { nome: "lLoadCells", tipo: "Lógico", descricao: "Se .T., carrega automaticamente todas as colunas com base no SX3.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação manual de seção e colunas em TReport
User Function ExTRSection(oReport)
    Local oSecCli := Nil

    // Cria seção vinculada à tabela SA1
    oSecCli := TRSection():New(oReport, "Dados dos Clientes", {"SA1"})

    // Adiciona células manuais na seção
    TRCell():New(oSecCli, "A1_COD", "SA1", "Código", "@!", 6)
    TRCell():New(oSecCli, "A1_NOME", "SA1", "Razão Social", "@!", 40)
    TRCell():New(oSecCli, "A1_MUN", "SA1", "Município", "@!", 25)
    TRCell():New(oSecCli, "A1_EST", "SA1", "UF", "@!", 2)
Return oSecCli`
  },
  {
    nome: "TRCell",
    categoria: "Relatórios e Impressão",
    sintaxe: "TRCell():New( <oSection>, <cName>, [<cAlias>], [<cTitle>], [<cPicture>], [<nSize>], [<lPixel>], [<bBlock>] )",
    retorno: "Objeto (Instância da classe TRCell)",
    descricaoCurta: "Define e formata uma coluna/célula de dados dentro de uma seção TRSection de um TReport.",
    descricaoDetalhada: "Configura um campo de dados na seção do relatório, definindo título da coluna, máscara de edição (Picture), largura, alinhamento e opcionalmente um bloco de código para cálculo de valor customizado.",
    parametros: [
      { nome: "oSection", tipo: "Objeto", descricao: "Objeto da seção TRSection pai à qual a célula pertence.", opcional: false },
      { nome: "cName", tipo: "Caractere", descricao: "Nome do campo no banco (ex: 'A1_COD') ou identificador da célula.", opcional: false },
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela correspondente (ex: 'SA1').", opcional: true },
      { nome: "cTitle", tipo: "Caractere", descricao: "Título exibido no cabeçalho da coluna na impressão.", opcional: true },
      { nome: "cPicture", tipo: "Caractere", descricao: "Máscara de formatação numérica, data ou texto (ex: '@E 999,999.99').", opcional: true },
      { nome: "nSize", tipo: "Numérico", descricao: "Tamanho da coluna em caracteres ou pixels.", opcional: true },
      { nome: "lPixel", tipo: "Lógico", descricao: "Se .T., tamanho em pixels; se .F., em caracteres. Padrão: .F.", opcional: true },
      { nome: "bBlock", tipo: "Bloco de Código", descricao: "Bloco de código para cálculo dinâmico do conteúdo da coluna.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de célula calculada via bloco de código
User Function ExTRCell(oSection)
    Local oCellVal := Nil

    // Célula simples vinculada a campo
    TRCell():New(oSection, "C6_PRODUTO", "SC6", "Produto", "@!", 15)

    // Célula calculada com fórmula dinâmica
    oCellVal := TRCell():New(oSection, "TOTAL_ITEM", "", "Vlr Total", "@E 999,999.99", 14, .F., ;
        {|| SC6->C6_QTDVEN * SC6->C6_PRCVEN })
Return oCellVal`
  },
  {
    nome: "TRFunction",
    categoria: "Relatórios e Impressão",
    sintaxe: "TRFunction():New( <oSection>, [<cName>], <cFunction>, [<oBreak>], [<cTitle>], [<cPicture>], [<uFormula>], [<lEndSection>] )",
    retorno: "Objeto (Instância da classe TRFunction)",
    descricaoCurta: "Adiciona uma função de totalização, média, contagem ou soma acumulada em colunas de um TReport.",
    descricaoDetalhada: "Cria totalizadores automáticos em seções do TReport associados a quebras de seção ou ao rodapé geral do relatório. Suporta funções como 'SUM' (soma), 'COUNT' (contagem), 'AVERAGE' (média), 'MIN' (mínimo) e 'MAX' (máximo).",
    parametros: [
      { nome: "oSection", tipo: "Objeto", descricao: "Seção TRSection na qual a totalização será calculada.", opcional: false },
      { nome: "cName", tipo: "Caractere", descricao: "Identificador interno ou nome da célula a ser totalizada.", opcional: true },
      { nome: "cFunction", tipo: "Caractere", descricao: "Operação: 'SUM', 'COUNT', 'AVERAGE', 'MIN' ou 'MAX'.", opcional: false },
      { nome: "oBreak", tipo: "Objeto", descricao: "Objeto de quebra TRBreak onde o totalizador será impresso e zerado.", opcional: true },
      { nome: "cTitle", tipo: "Caractere", descricao: "Texto descritivo exibido junto ao total (ex: 'Total Geral:').", opcional: true },
      { nome: "cPicture", tipo: "Caractere", descricao: "Máscara de formatação numérica do valor totalizado.", opcional: true },
      { nome: "uFormula", tipo: "Bloco de Código / Caractere", descricao: "Fórmula ou expressão customizada para o cálculo.", opcional: true },
      { nome: "lEndSection", tipo: "Lógico", descricao: "Define se o total deve ser impresso no final da seção. Padrão: .T.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Adicionando totalizador de soma e contador de itens
User Function ExTRFunction(oSection, oCellValor)
    // Totaliza a soma da coluna de valor
    TRFunction():New(oSection, "C6_VALOR", "SUM", Nil, "Total dos Pedidos:", "@E 9,999,999.99")

    // Adiciona contagem de itens impressos
    TRFunction():New(oSection, "C6_ITEM", "COUNT", Nil, "Quantidade de Linhas:", "999,999")
Return`
  },
  {
    nome: "SetPrint",
    categoria: "Relatórios e Impressão",
    sintaxe: "SetPrint( <cAlias>, <cProg>, <cPerg>, [<cDesc1>], [<cDesc2>], [<cDesc3>], [<cDesc4>], [<lDisabNorm>], [<aOrd>], [<lDisabSpool>], [<cFilter>] )",
    retorno: "Numérico (Status da configuração de impressão ou 0 se cancelado)",
    descricaoCurta: "Abre a tela padrão do Protheus para configuração de destino, parâmetros e orientação de impressão.",
    descricaoDetalhada: "Função clássica de preparação de impressão em relatórios legados e padrão Protheus. Exibe a interface que permite ao usuário selecionar se a saída será enviada para Disco, Spool, Impressora, E-mail ou Planilha, além de disparar a tela de perguntas (SX1).",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela principal do relatório (ex: 'SA1').", opcional: false },
      { nome: "cProg", tipo: "Caractere", descricao: "Nome da rotina do relatório (ex: 'MATR010').", opcional: false },
      { nome: "cPerg", tipo: "Caractere", descricao: "Código do grupo de perguntas do SX1 associado.", opcional: false },
      { nome: "cDesc1", tipo: "Caractere", descricao: "Primeira linha da descrição na janela de diálogo.", opcional: true },
      { nome: "cDesc2", tipo: "Caractere", descricao: "Segunda linha de descrição da rotina.", opcional: true },
      { nome: "cDesc3", tipo: "Caractere", descricao: "Terceira linha descritiva.", opcional: true },
      { nome: "cDesc4", tipo: "Caractere", descricao: "Quarta linha descritiva.", opcional: true },
      { nome: "lDisabNorm", tipo: "Lógico", descricao: "Se .T., desabilita opção de formulário padrão.", opcional: true },
      { nome: "aOrd", tipo: "Array", descricao: "Lista de opções de ordenação para seleção do operador.", opcional: true },
      { nome: "lDisabSpool", tipo: "Lógico", descricao: "Se .T., desabilita saída direta para spool.", opcional: true },
      { nome: "cFilter", tipo: "Caractere", descricao: "Filtro inicial de seleção de registros.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Inicialização de relatório tradicional com SetPrint
User Function ExSetPrint()
    Local cDesc1 := "Este relatório emitirá a relação de clientes conforme parâmetros."
    Local cDesc2 := ""
    Local cDesc3 := ""
    Local aOrd   := {"Por Código", "Por Razão Social", "Por CNPJ"}

    // Abre diálogo de configuração do Protheus
    SetPrint("SA1", "RELCLI", "MTR010", @cDesc1, @cDesc2, @cDesc3, "", .F., aOrd, .F.)

    If nLastKey == 27 // Tecla ESC pressionada
        Return
    EndIf

    SetDefault(aReturn, "SA1")
    RptStatus({|| U_ImprimeRel()}, "Imprimindo Clientes...")
Return`
  },
  {
    nome: "Cabec",
    categoria: "Relatórios e Impressão",
    sintaxe: "Cabec( <cTitulo>, <cCabec1>, <cCabec2>, <cNomeProg>, <nTamanho>, [<nTipo>] )",
    retorno: "NIL",
    descricaoCurta: "Imprime o cabeçalho padrão de relatório Protheus com título, empresa, filial, data, hora e página.",
    descricaoDetalhada: "Rotina padrão para impressão de cabeçalhos em relatórios de formato caractere/legado no Protheus. Controla automaticamente o número da página (variável nPage / m_pag), linhas por página e formatação de acordo com o tamanho padrão da folha (80, 132 ou 220 colunas).",
    parametros: [
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título principal impresso no centro do cabeçalho.", opcional: false },
      { nome: "cCabec1", tipo: "Caractere", descricao: "Primeira linha de cabeçalho das colunas do relatório.", opcional: false },
      { nome: "cCabec2", tipo: "Caractere", descricao: "Segunda linha de cabeçalho das colunas do relatório.", opcional: false },
      { nome: "cNomeProg", tipo: "Caractere", descricao: "Nome do programa impresso no canto superior esquerdo.", opcional: false },
      { nome: "nTamanho", tipo: "Numérico", descricao: "Largura do relatório em colunas (ex: 80, 132 ou 220).", opcional: false },
      { nome: "nTipo", tipo: "Numérico", descricao: "Tipo de fonte ou layout (padrão: 15 ou 18).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Impressão de cabeçalho padrão em relatório texto
User Function ExCabec()
    Local cTitulo  := "RELATÓRIO DE PEDIDOS PENDENTES"
    Local cCabec1  := "PEDIDO   CLIENTE                         EMISSAO        VALOR"
    Local cCabec2  := "======   ==============================  ==========  ========="
    Local cProg    := "U_RELPED"
    Local nTamanho := 132

    // Imprime cabeçalho padrão Protheus com data, hora e paginação
    Cabec(cTitulo, cCabec1, cCabec2, cProg, nTamanho)
Return`
  },
  {
    nome: "Roda",
    categoria: "Relatórios e Impressão",
    sintaxe: "Roda( [<nTamanho>], [<cRodape>], [<nTipo>] )",
    retorno: "NIL",
    descricaoCurta: "Imprime o rodapé padrão de relatório Protheus com linha divisória e dados de encerramento.",
    descricaoDetalhada: "Complemento da função Cabec() em relatórios de formato caractere/legado. Imprime a linha de encerramento da página ou relatório, ajustando o cursor de linha (nLin) para nova página ou final de arquivo de impressão.",
    parametros: [
      { nome: "nTamanho", tipo: "Numérico", descricao: "Largura em colunas do relatório (ex: 80, 132 ou 220). Padrão: 132.", opcional: true },
      { nome: "cRodape", tipo: "Caractere", descricao: "Texto personalizado opcional para o rodapé.", opcional: true },
      { nome: "nTipo", tipo: "Numérico", descricao: "Tipo de fonte para a linha de rodapé.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Encerramento de página com controle de rodapé
User Function ExRoda()
    // Se atingir o limite de linhas da página (ex: 55), imprime rodapé e ejeta página
    If nLin > 55
        Roda(132, "Protheus - TOTVS S/A")
        Cabec(cTitulo, cCabec1, cCabec2, cProg, 132)
        nLin := 8
    EndIf
Return`
  },
  {
    nome: "FWMsPrinter",
    categoria: "Relatórios e Impressão",
    sintaxe: "FWMSPrinter():New( <cFilePrinter>, [<nDevice>], [<lAdjustToLegacy>], [<cPathInServer>], [<lDisabeSetup>], [<lTReport>], [<oPrintSetup>], [<cPrinter>], [<lServer>], [<lPDFAsPNG>], [<lRaw>] )",
    retorno: "Objeto (Instância da classe FWMSPrinter)",
    descricaoCurta: "Classe gráfica de alta precisão para desenhar linhas, caixas, textos, códigos de barra e gerar PDFs.",
    descricaoDetalhada: "A classe FWMsPrinter é o padrão moderno do Protheus para geração gráfica de documentos e relatórios arbitrários (DANFE, Boletos bancários, etiquetas e comprovantes). Oferece métodos como Say(), SayAlign(), Box(), Line(), QRCode(), SayBitmap() e exportação direta em PDF.",
    parametros: [
      { nome: "cFilePrinter", tipo: "Caractere", descricao: "Nome base do arquivo de impressão gerado em disco.", opcional: false },
      { nome: "nDevice", tipo: "Numérico", descricao: "Destino (1: Arquivo, 2: Spooler do Windows, 6: PDF). Padrão: 6.", opcional: true },
      { nome: "lAdjustToLegacy", tipo: "Lógico", descricao: "Se .T., ajusta escala para compatibilidade com TMSPrinter.", opcional: true },
      { nome: "cPathInServer", tipo: "Caractere", descricao: "Diretório do servidor onde os arquivos temporários são salvos.", opcional: true },
      { nome: "lDisabeSetup", tipo: "Lógico", descricao: "Se .T., desabilita a tela de setup de impressora.", opcional: true },
      { nome: "lTReport", tipo: "Lógico", descricao: "Se .T., integração com framework TReport.", opcional: true },
      { nome: "oPrintSetup", tipo: "Objeto", descricao: "Objeto de configuração prévia de impressora.", opcional: true },
      { nome: "cPrinter", tipo: "Caractere", descricao: "Nome da impressora de destino no sistema operacional.", opcional: true },
      { nome: "lServer", tipo: "Lógico", descricao: "Se .T., processamento no servidor sem interface visual.", opcional: true },
      { nome: "lPDFAsPNG", tipo: "Lógico", descricao: "Se .T., converte saídas PDF em imagens rasterizadas.", opcional: true },
      { nome: "lRaw", tipo: "Lógico", descricao: "Se .T., envia comandos brutos para a impressora (ESC/POS, ZPL).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Emissão de comprovante gráfico em PDF com FWMsPrinter
User Function GerarComprovante()
    Local oPrinter := FWMSPrinter():New("Comprovante.pdf", 6, .F., "", .T.)
    Local oFont12  := TFont():New("Arial",, 12,, .T.)
    Local oFont10  := TFont():New("Arial",, 10,, .F.)

    oPrinter:SetResolution(72)
    oPrinter:SetPortrait()
    oPrinter:StartPage()

    // Desenha caixa de destaque
    oPrinter:Box(50, 50, 200, 500, "-3")

    // Imprime títulos e textos formatados
    oPrinter:Say(80, 70, "COMPROVANTE DE ENTREGA", oFont12)
    oPrinter:Say(120, 70, "Cliente: " + SA1->A1_NOME, oFont10)
    oPrinter:Say(150, 70, "Data: " + DToC(Date()) + " - Hora: " + Time(), oFont10)

    oPrinter:EndPage()
    oPrinter:Preview() // Abre visualizador de impressão
Return`
  },
  {
    nome: "TMSPrinter",
    categoria: "Relatórios e Impressão",
    sintaxe: "TMSPrinter():New( [<cTitle>] )",
    retorno: "Objeto (Instância da classe TMSPrinter)",
    descricaoCurta: "Classe legada de impressão gráfica no Protheus para criação de documentos, recibos e relatórios pixel a pixel.",
    descricaoDetalhada: "Classe antecessora do FWMsPrinter amplamente utilizada em customizações para emissão de cheques, recibos, ordens de serviço e formulários contínuos com controle milimétrico ou pixel a pixel de fontes, bordas e imagens.",
    parametros: [
      { nome: "cTitle", tipo: "Caractere", descricao: "Título do documento na fila de impressão do Spool do Windows.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Impressão de recibo gráfico simples com TMSPrinter
User Function ExTMSPrinter()
    Local oPrint := TMSPrinter():New("Recibo de Pagamento")

    oPrint:SetPortrait()
    oPrint:StartPage()

    // Imprime texto nas coordenadas (Linha, Coluna)
    oPrint:Say(100, 100, "RECIBO DE PRESTAÇÃO DE SERVIÇOS")
    oPrint:Say(150, 100, "Valor Pago: R$ 1.500,00")

    // Desenha linha separadora horizontal
    oPrint:Line(180, 100, 180, 600)

    oPrint:EndPage()
    oPrint:Preview()
Return`
  },
  {
    nome: "PrintDialog",
    categoria: "Relatórios e Impressão",
    sintaxe: "PrintDialog( [<oPrinter>] )",
    retorno: "Lógico (.T. se o usuário confirmou a impressão, .F. se cancelou)",
    descricaoCurta: "Exibe a tela de diálogo do Windows/SmartClient para seleção e configuração das propriedades da impressora.",
    descricaoDetalhada: "Invoca o diálogo nativo de seleção de impressoras instaladas no sistema operacional do cliente ou servidor, permitindo escolher impressora de destino, intervalo de páginas, número de cópias e qualidade de impressão antes do envio do job.",
    parametros: [
      { nome: "oPrinter", tipo: "Objeto", descricao: "Objeto de impressora (FWMsPrinter ou TMSPrinter) a ser configurado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Diálogo de seleção de impressora antes da geração
User Function ExPrintDialog(oPrinter)
    If oPrinter:PrintDialog()
        ConOut("Impressora selecionada: " + oPrinter:cPrinter)
        oPrinter:Print()
    Else
        ConOut("Usuário cancelou o diálogo de impressão.")
    EndIf
Return`
  }
);
