/**
 * Catalogo de Funcoes ADVPL - Modulo Mensagens e Telas
 * Funcoes de comunicacao com o usuario, dialogos de confirmacao e saida em console
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "MsgInfo",
    categoria: "Mensagens e Telas",
    sintaxe: "MsgInfo( <cMensagem>, [<cTitulo>] )",
    retorno: "NIL",
    descricaoCurta: "Exibe uma caixa de dialogo informativa com botao OK e icone de informacao.",
    descricaoDetalhada: "Apresenta uma mensagem na interface grafica do SmartClient (ou Protheus Web) para dar retornos de sucesso ou comunicados operacionais. Interrompe a execucao da tela ate que o operador clique no botao OK.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto descritivo a ser exibido no corpo da janela.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Titulo da janela na barra superior (padrao: 'Atencao').", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Notificacao de conclusao de lote de processamento
User Function ExMsgInfo()
    Local cMsg := "Processamento de faturamento finalizado com sucesso! Foram emitidas 12 notas."
    MsgInfo(cMsg, "Sucesso no Faturamento")
Return`
  },
  {
    nome: "MsgAlert",
    categoria: "Mensagens e Telas",
    sintaxe: "MsgAlert( <cMensagem>, [<cTitulo>] )",
    retorno: "NIL",
    descricaoCurta: "Exibe uma caixa de dialogo de alerta com botao OK e icone de advertencia.",
    descricaoDetalhada: "Utilizada para alertar o usuario sobre inconsistencias nao impeditivas, validacoes de campos ou avisos importantes de regras de negocio. Exibe um icone de triangulo amarelo de alerta.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto da advertencia a ser exibida.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Titulo exibido no cabecalho da janela de alerta.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Alerta de limite de credito proximo de estourar
User Function ExMsgAlert()
    Local nLimite  := 50000.00
    Local nSaldo   := 48200.00
    Local cAlerta  := "Atencao: O cliente atingiu 96% do seu limite de credito rotativo!"

    If nSaldo >= (nLimite * 0.95)
        MsgAlert(cAlerta, "Advertencia de Credito")
    EndIf
Return`
  },
  {
    nome: "MsgStop",
    categoria: "Mensagens e Telas",
    sintaxe: "MsgStop( <cMensagem>, [<cTitulo>] )",
    retorno: "NIL",
    descricaoCurta: "Exibe uma caixa de dialogo de erro critico com botao OK e icone de parada.",
    descricaoDetalhada: "Notifica o operador sobre erros graves, operacoes canceladas ou bloqueios que impedem o prosseguimento da rotina. Exibe o icone vermelho de parada (Stop).",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Mensagem descritiva do erro impeditivo.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Titulo no cabecalho da janela (padrao: 'Atencao').", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Bloqueio de operacao quando periodo contabil estiver fechado
User Function ExMsgStop()
    Local lPeriodoFechado := .T.

    If lPeriodoFechado
        MsgStop("Operacao cancelada: O periodo contabil atual ja esta encerrado para lancamentos!", "Bloqueio Contabil")
        Return .F.
    EndIf
Return .T.`
  },
  {
    nome: "MsgYesNo",
    categoria: "Mensagens e Telas",
    sintaxe: "MsgYesNo( <cMensagem>, [<cTitulo>] )",
    retorno: "Logico (.T. se 'Sim', .F. se 'Nao')",
    descricaoCurta: "Exibe uma caixa de confirmacao com botoes 'Sim' e 'Nao', retornando a escolha do usuario.",
    descricaoDetalhada: "Abre um dialogo com icone de interrogacao e duas opcoes de resposta. Se o usuario clicar em 'Sim' (ou pressionar Enter), retorna .T. Se clicar em 'Nao' ou fechar no X, retorna .F. Essencial para confirmacao de exclusoes ou operacoes irreversíveis.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto da pergunta de confirmacao a ser exibida.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Titulo no topo da caixa de confirmacao.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Confirmacao de exclusao de registro de pedido
User Function ExMsgYesNo()
    Local cMsg := "Deseja realmente cancelar este pedido de venda? Esta operacao nao podera ser desfeita."

    If MsgYesNo(cMsg, "Confirmacao de Cancelamento")
        ConOut("Usuario optou por cancelar o pedido.")
        // Executa rotina de exclusao...
    Else
        ConOut("Cancelamento abortado pelo operador.")
    EndIf
Return`
  },
  {
    nome: "Aviso",
    categoria: "Mensagens e Telas",
    sintaxe: "Aviso( <cTitulo>, <cMensagem>, <aBotoes>, [<nTam>], [<cRotina>], [<nRotAuto>], [<cIcone>] )",
    retorno: "Numerico (indice do botao selecionado: 1, 2, 3...)",
    descricaoCurta: "Exibe uma janela customizada de aviso com multiplos botoes configuraveis.",
    descricaoDetalhada: "Funcao robusta do Protheus que permite criar caixas de dialogo avancadas com 1 ate 3 botoes personalizados definidos em um array. Retorna o numero inteiro correspondente a posicao do botao selecionado pelo usuario.",
    parametros: [
      { nome: "cTitulo", tipo: "Caractere", descricao: "Titulo exibido na janela.", opcional: false },
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto da mensagem detalhada para o usuario.", opcional: false },
      { nome: "aBotoes", tipo: "Array", descricao: "Array de strings com o texto de cada botao (ex: {'Continuar', 'Tentar Novamente', 'Cancelar'}).", opcional: false },
      { nome: "nTam", tipo: "Numerico", descricao: "Tamanho da janela (1: Pequena, 2: Media, 3: Grande).", opcional: true },
      { nome: "cRotina", tipo: "Caractere", descricao: "Nome da rotina chamadora para rastreamento.", opcional: true },
      { nome: "nRotAuto", tipo: "Numerico", descricao: "Opcao de resposta default para execucao em rotina automatica (ExecAuto).", opcional: true },
      { nome: "cIcone", tipo: "Caractere", descricao: "Icone exibido na janela ('Alert', 'Info', 'Stop').", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Decisao com 3 caminhos de acao para o usuario
User Function ExAviso()
    Local cTitulo  := "Divergencia de Saldo em Estoque"
    Local cMsg     := "O saldo fisico em estoque e inferior a quantidade solicitada no pedido."
    Local aOpcoes  := {"Ignorar e Continuar", "Ajustar Saldo", "Cancelar"}
    Local nEscolha := 0

    nEscolha := Aviso(cTitulo, cMsg, aOpcoes, 2, "VENDAS", 3, "Alert")

    Do Case
        Case nEscolha == 1
            ConOut("Opcao selecionada: Ignorar e Continuar")
        Case nEscolha == 2
            ConOut("Opcao selecionada: Abrir tela de ajuste de estoque")
        Case nEscolha == 3
            ConOut("Opcao selecionada: Cancelar operacao")
    EndCase
Return`
  },
  {
    nome: "ConOut",
    categoria: "Mensagens e Telas",
    sintaxe: "ConOut( <exp1>, [<exp2>], ... )",
    retorno: "NIL",
    descricaoCurta: "Imprime mensagens diretamente no console do servidor Protheus (AppServer) para logs e depuracao.",
    descricaoDetalhada: "Envia mensagens de texto para a saida padrao do console do AppServer (totvs_appserver.exe) e para o arquivo de log do servidor (appserver.log / console.log). Indispensavel para monitoramento de rotinas em batch, schedules, APIs REST e debug de regras de negocio.",
    parametros: [
      { nome: "exp1", tipo: "Caractere / Qualquer tipo", descricao: "Primeira expressao a ser impressa no log.", opcional: false },
      { nome: "exp2...", tipo: "Caractere / Qualquer tipo", descricao: "Expressoes adicionais separadas por virgula.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Log estruturado de rastreabilidade de integracao
User Function ExConOut()
    Local cRotina := "INTEGRA_PEDIDOS"
    Local dHoje   := Date()
    Local cHora   := Time()
    Local nRegs   := 150

    ConOut("==================================================")
    ConOut("[LOG] Inicio do processamento da rotina: " + cRotina)
    ConOut("[DATA/HORA] " + dToC(dHoje) + " - " + cHora)
    ConOut("[STATUS] Registros processados no lote: " + cValToChar(nRegs))
    ConOut("==================================================")
Return`
  },
  {
    nome: "MsgRun",
    categoria: "Mensagens e Telas",
    sintaxe: "MsgRun( <cMensagem>, <cTitulo>, <bAcao> )",
    retorno: "Qualquer tipo (Resultado do bloco de código)",
    descricaoCurta: "Executa um bloco de código exibindo uma janela de aviso modal com animação de aguarde.",
    descricaoDetalhada: "Apresenta uma janela com mensagem de espera para o usuário enquanto o bloco de código <bAcao> é executado em segundo plano, fechando a janela automaticamente ao término.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Mensagem exibida na janela (ex: 'Processando notas...').", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título da janela modal.", opcional: false },
      { nome: "bAcao", tipo: "Bloco de Código", descricao: "Code-block a ser executado {|oDlg| ...}.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Execução de rotina com tela modal de aguarde
User Function ExMsgRun()
    MsgRun("Aguarde, calculando comissões...", "Processamento", {|| Sleep(2000) })
Return`
  },
  {
    nome: "Processa",
    categoria: "Mensagens e Telas",
    sintaxe: "Processa( <bAcao>, [<cTitulo>], [<cMensagem>], [<lCancela>] )",
    retorno: "NIL",
    descricaoCurta: "Inicia uma régua de processamento padrão do Protheus para rotinas de longa duração.",
    descricaoDetalhada: "Abre a janela padrão de processamento com barra de progresso (régua). O bloco de código recebe o controle e pode incrementar a régua através de IncProc() e SetRegua().",
    parametros: [
      { nome: "bAcao", tipo: "Bloco de Código", descricao: "Bloco com a rotina de processamento.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título da janela de processamento.", opcional: true },
      { nome: "cMensagem", tipo: "Caractere", descricao: "Mensagem descritiva da etapa.", opcional: true },
      { nome: "lCancela", tipo: "Lógico", descricao: "Habilita botão Cancelar na tela (padrão: .F.).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Abertura de régua de processamento
User Function ExProcessa()
    Processa({|| MinhaRotina() }, "Processamento em Lote", "Atualizando cadastros...")
Return

Static Function MinhaRotina()
    Local nI := 0
    ProcRegua(100) // Define limite
    For nI := 1 To 100
        IncProc("Processando item " + cValToChar(nI))
        Sleep(50)
    Next nI
Return`
  },
  {
    nome: "IncProc",
    categoria: "Mensagens e Telas",
    sintaxe: "IncProc( [<cTexto>] )",
    retorno: "NIL",
    descricaoCurta: "Incrementa a régua de processamento em 1 unidade e opcionalmente atualiza o texto de status.",
    descricaoDetalhada: "Avança a barra de progresso exibida pela função Processa(). Mantém o operador informado sobre o progresso de laços extensos.",
    parametros: [
      { nome: "cTexto", tipo: "Caractere", descricao: "Mensagem descritiva exibida abaixo da régua.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Incremento de régua de processamento
User Function ExIncProc()
    // Dentro de um laço acionado por Processa:
    IncProc("Atualizando registro...")
Return`
  },
  {
    nome: "SetRegua",
    categoria: "Mensagens e Telas",
    sintaxe: "SetRegua( <nTotal> )",
    retorno: "NIL",
    descricaoCurta: "Define o valor máximo (100%) da régua de processamento aberta pela função Processa.",
    descricaoDetalhada: "Configura a escala da barra de progresso. A cada chamada subsequente de IncProc(), a porcentagem concluída é calculada em relação a este total.",
    parametros: [
      { nome: "nTotal", tipo: "Numérico", descricao: "Total de iterações ou registros a processar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Configuração da escala da régua
User Function ExSetRegua()
    Local nQtdRegistros := 500
    SetRegua(nQtdRegistros) // Define o 100% da barra
Return`
  },
  {
    nome: "TDialog",
    categoria: "Mensagens e Telas",
    sintaxe: "TDialog():New( [<nTop>], [<nLeft>], [<nBottom>], [<nRight>], [<cCaption>], [<uParam6>], [<uParam7>], [<uParam8>], [<nStyle>], [<nClrText>], [<nClrBack>], [<oBrush>], [<oWnd>], [<lPixel>] )",
    retorno: "Objeto (Instância da classe TDialog)",
    descricaoCurta: "Classe base para criação e exibição de janelas de diálogo modais e não modais customizadas no Protheus.",
    descricaoDetalhada: "Principal container de interface visual para criação de janelas customizadas. Suporta definição de coordenadas em caracteres ou pixels, cores, estilos de janela e ativação modal com método :Activate().",
    parametros: [
      { nome: "nTop", tipo: "Numérico", descricao: "Coordenada superior da janela.", opcional: true },
      { nome: "nLeft", tipo: "Numérico", descricao: "Coordenada esquerda da janela.", opcional: true },
      { nome: "nBottom", tipo: "Numérico", descricao: "Coordenada inferior da janela.", opcional: true },
      { nome: "nRight", tipo: "Numérico", descricao: "Coordenada direita da janela.", opcional: true },
      { nome: "cCaption", tipo: "Caractere", descricao: "Título exibido na barra superior da janela.", opcional: true },
      { nome: "lPixel", tipo: "Lógico", descricao: "Se .T., coordenadas calculadas em pixels. Padrão: .F.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de tela modal com TDialog
User Function MinhaJanela()
    Local oDlg := Nil
    Local cTitulo := "Cadastro Rápido de Contato"

    DEFINE MSDIALOG oDlg TITLE cTitulo FROM 0, 0 TO 300, 450 PIXEL

    @ 20, 20 SAY "Informe os dados complementares na janela." OF oDlg PIXEL
    @ 110, 80 BUTTON "Confirmar" SIZE 50, 15 ACTION oDlg:End() OF oDlg PIXEL

    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "TGet",
    categoria: "Mensagens e Telas",
    sintaxe: "TGet():New( <nRow>, <nCol>, <bSetGet>, [<oWnd>], [<nWidth>], [<nHeight>], [<cPicture>], [<bValid>], [<nClrFore>], [<nClrBack>], [<oFont>], [<lDesign>], [<oCursor>], [<lPixel>], [<cMsg>], [<lUpdate>], [<bWhen>] )",
    retorno: "Objeto (Instância da classe TGet)",
    descricaoCurta: "Classe de controle visual para entrada e edição de textos, números e datas com máscara e validação.",
    descricaoDetalhada: "Cria um campo de edição na interface gráfica. Suporta máscaras de digitação (Picture), bloco de validação (bValid), condição de ativação (bWhen) e amarração direta à variável via bloco bSetGet.",
    parametros: [
      { nome: "nRow", tipo: "Numérico", descricao: "Posição vertical (linha) do campo.", opcional: false },
      { nome: "nCol", tipo: "Numérico", descricao: "Posição horizontal (coluna) do campo.", opcional: false },
      { nome: "bSetGet", tipo: "Bloco de Código", descricao: "Bloco de amarração da variável (ex: {|u| If(PCount() > 0, cVar := u, cVar)}).", opcional: false },
      { nome: "oWnd", tipo: "Objeto", descricao: "Container pai (TDialog ou TPanel).", opcional: true },
      { nome: "nWidth", tipo: "Numérico", descricao: "Largura do campo em pixels.", opcional: true },
      { nome: "nHeight", tipo: "Numérico", descricao: "Altura do campo em pixels.", opcional: true },
      { nome: "cPicture", tipo: "Caractere", descricao: "Máscara de edição (ex: '@!' para maiúsculas).", opcional: true },
      { nome: "bValid", tipo: "Bloco de Código", descricao: "Validação executada ao sair do campo.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de campo TGet com validação
User Function ExTGet()
    Local oDlg := Nil
    Local cCodigo := Space(6)
    Local oGetCod := Nil

    DEFINE MSDIALOG oDlg TITLE "Entrada de Dados" FROM 0, 0 TO 200, 350 PIXEL

    @ 20, 20 SAY "Código do Produto:" OF oDlg PIXEL
    oGetCod := TGet():New(18, 80, {|u| If(PCount() > 0, cCodigo := u, cCodigo)}, oDlg, 60, 12, "@!", {|| !Empty(cCodigo)},,,, .T.)

    @ 60, 80 BUTTON "OK" SIZE 40, 15 ACTION oDlg:End() OF oDlg PIXEL
    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "TSay",
    categoria: "Mensagens e Telas",
    sintaxe: "TSay():New( <nRow>, <nCol>, <bText>, [<oWnd>], [<cPicture>], [<oFont>], [<lCentered>], [<lRight>], [<lBottom>], [<lPixel>], [<nClrText>], [<nClrBack>], [<nWidth>], [<nHeight>] )",
    retorno: "Objeto (Instância da classe TSay)",
    descricaoCurta: "Classe para exibição de rótulos estáticos de texto (labels) em formulários e janelas de diálogo.",
    descricaoDetalhada: "Exibe rótulos textuais ou valores formatados em janelas de diálogo. Pode receber uma string estática ou um bloco de código dinâmico para atualização em tempo real de textos explicativos.",
    parametros: [
      { nome: "nRow", tipo: "Numérico", descricao: "Posição vertical na janela.", opcional: false },
      { nome: "nCol", tipo: "Numérico", descricao: "Posição horizontal na janela.", opcional: false },
      { nome: "bText", tipo: "Caractere / Bloco de Código", descricao: "Texto a exibir ou bloco dinâmico {|| 'Texto'}.", opcional: false },
      { nome: "oWnd", tipo: "Objeto", descricao: "Janela ou diálogo pai do rótulo.", opcional: true },
      { nome: "cPicture", tipo: "Caractere", descricao: "Máscara de formatação do texto exibido.", opcional: true },
      { nome: "oFont", tipo: "Objeto", descricao: "Fonte tipográfica (TFont) para o rótulo.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Rótulo com texto dinâmico em formulário
User Function ExTSay()
    Local oDlg := Nil
    Local oSay := Nil

    DEFINE MSDIALOG oDlg TITLE "Status do Sistema" FROM 0, 0 TO 150, 300 PIXEL

    // Cria rótulo com data e hora dinâmica
    oSay := TSay():New(25, 20, {|| "Conectado em: " + DToC(Date()) + " às " + Time()}, oDlg,,,,,, .T.)

    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "TButton",
    categoria: "Mensagens e Telas",
    sintaxe: "TButton():New( <nRow>, <nCol>, <cCaption>, [<oWnd>], <bAction>, [<nWidth>], [<nHeight>], [<nHelpId>], [<oFont>], [<lDefault>], [<lPixel>], [<lDesign>] )",
    retorno: "Objeto (Instância da classe TButton)",
    descricaoCurta: "Classe para inserção de botões de comando interativos com ação associada a blocos de código.",
    descricaoDetalhada: "Cria botões de ação em caixas de diálogo. Dispara a execução de um bloco de código (bAction) quando clicado pelo usuário ou acionado por atalho de teclado.",
    parametros: [
      { nome: "nRow", tipo: "Numérico", descricao: "Posição vertical do botão.", opcional: false },
      { nome: "nCol", tipo: "Numérico", descricao: "Posição horizontal do botão.", opcional: false },
      { nome: "cCaption", tipo: "Caractere", descricao: "Texto descritivo exibido no botão.", opcional: false },
      { nome: "oWnd", tipo: "Objeto", descricao: "Container pai do botão (TDialog).", opcional: true },
      { nome: "bAction", tipo: "Bloco de Código", descricao: "Bloco de instruções executado ao clicar no botão.", opcional: false },
      { nome: "nWidth", tipo: "Numérico", descricao: "Largura do botão em pixels.", opcional: true },
      { nome: "nHeight", tipo: "Numérico", descricao: "Altura do botão em pixels.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Botões de confirmação e cancelamento
User Function ExTButton()
    Local oDlg := Nil

    DEFINE MSDIALOG oDlg TITLE "Confirmação" FROM 0, 0 TO 160, 320 PIXEL

    TButton():New(45, 30, "Processar", oDlg, {|| MsgInfo("Processado com sucesso!", "OK"), oDlg:End()}, 50, 16,,,, .T.)
    TButton():New(45, 90, "Cancelar", oDlg, {|| oDlg:End()}, 50, 16,,,, .T.)

    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "TComboBox",
    categoria: "Mensagens e Telas",
    sintaxe: "TComboBox():New( <nRow>, <nCol>, <bSetGet>, <aItems>, [<nWidth>], [<nHeight>], [<oWnd>], [<nHelpId>], [<bChange>], [<bValid>], [<nClrFore>], [<nClrBack>], [<lPixel>] )",
    retorno: "Objeto (Instância da classe TComboBox)",
    descricaoCurta: "Classe para exibição de listas suspensas de seleção única (combobox) em telas customizadas.",
    descricaoDetalhada: "Apresenta uma caixa de seleção com lista suspensa populada por array. Permite selecionar uma opção e atualizar a variável vinculada, disparando eventos de troca de valor (bChange).",
    parametros: [
      { nome: "nRow", tipo: "Numérico", descricao: "Posição vertical do combo.", opcional: false },
      { nome: "nCol", tipo: "Numérico", descricao: "Posição horizontal do combo.", opcional: false },
      { nome: "bSetGet", tipo: "Bloco de Código", descricao: "Bloco que armazena o valor do item selecionado.", opcional: false },
      { nome: "aItems", tipo: "Array", descricao: "Vetor com as opções textuais da lista suspensa.", opcional: false },
      { nome: "nWidth", tipo: "Numérico", descricao: "Largura do controle em pixels.", opcional: true },
      { nome: "nHeight", tipo: "Numérico", descricao: "Altura do controle em pixels.", opcional: true },
      { nome: "oWnd", tipo: "Objeto", descricao: "Container pai (TDialog ou TPanel).", opcional: true },
      { nome: "bChange", tipo: "Bloco de Código", descricao: "Bloco disparado ao alterar a opção selecionada.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Seleção de tipo de operação via TComboBox
User Function ExTComboBox()
    Local oDlg := Nil
    Local aOpcoes := {"1=À Vista", "2=A Prazo", "3=Bonificação"}
    Local cOpcao  := aOpcoes[1]

    DEFINE MSDIALOG oDlg TITLE "Tipo de Venda" FROM 0, 0 TO 160, 300 PIXEL

    @ 20, 15 SAY "Condição:" OF oDlg PIXEL
    TComboBox():New(18, 60, {|u| If(PCount() > 0, cOpcao := u, cOpcao)}, aOpcoes, 80, 12, oDlg,,,,,, .T.)

    @ 50, 60 BUTTON "OK" SIZE 40, 14 ACTION oDlg:End() OF oDlg PIXEL
    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "TCheckBox",
    categoria: "Mensagens e Telas",
    sintaxe: "TCheckBox():New( <nRow>, <nCol>, <cCaption>, <bSetGet>, [<oWnd>], [<nWidth>], [<nHeight>], [<nHelpId>], [<bChange>], [<oFont>], [<bValid>], [<nClrFore>], [<nClrBack>], [<lPixel>] )",
    retorno: "Objeto (Instância da classe TCheckBox)",
    descricaoCurta: "Classe de controle gráfico que representa uma caixa de seleção (marcado/desmarcado) lógica.",
    descricaoDetalhada: "Insere uma caixa de seleção de estado binário (.T. / .F.) em formulários. Muito utilizada para marcar opções de processamento, filtros ou ativação de recursos opcionais.",
    parametros: [
      { nome: "nRow", tipo: "Numérico", descricao: "Posição vertical na tela.", opcional: false },
      { nome: "nCol", tipo: "Numérico", descricao: "Posição horizontal na tela.", opcional: false },
      { nome: "cCaption", tipo: "Caractere", descricao: "Texto explicativo ao lado da caixa de seleção.", opcional: false },
      { nome: "bSetGet", tipo: "Bloco de Código", descricao: "Bloco que lê e grava a variável lógica booleana.", opcional: false },
      { nome: "oWnd", tipo: "Objeto", descricao: "Container pai do controle.", opcional: true },
      { nome: "nWidth", tipo: "Numérico", descricao: "Largura do componente em pixels.", opcional: true },
      { nome: "nHeight", tipo: "Numérico", descricao: "Altura do componente em pixels.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Caixa de seleção para envio automático de e-mail
User Function ExTCheckBox()
    Local oDlg := Nil
    Local lEnviaEmail := .T.

    DEFINE MSDIALOG oDlg TITLE "Configurações" FROM 0, 0 TO 150, 320 PIXEL

    TCheckBox():New(25, 20, "Enviar comprovante por e-mail após concluir", ;
        {|u| If(PCount() > 0, lEnviaEmail := u, lEnviaEmail)}, oDlg, 120, 15,,,,,,, .T.)

    @ 45, 60 BUTTON "Salvar" SIZE 40, 14 ACTION oDlg:End() OF oDlg PIXEL
    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "TMsgBar",
    categoria: "Mensagens e Telas",
    sintaxe: "TMsgBar():New( <oWnd>, [<cPrompt>], [<lClock>], [<lKeyBoard>], [<lDate>], [<lCenter>], [<nClrText>], [<nClrBack>], [<oFont>] )",
    retorno: "Objeto (Instância da classe TMsgBar)",
    descricaoCurta: "Cria uma barra de status e mensagens informativas no rodapé de janelas e diálogos customizados.",
    descricaoDetalhada: "Acopla uma barra horizontal no rodapé da janela para exibição contínua de status, textos de ajuda ao passar sobre botões, relógio, data e status do teclado (Caps Lock / Num Lock).",
    parametros: [
      { nome: "oWnd", tipo: "Objeto", descricao: "Janela pai onde a barra de status será inserida.", opcional: false },
      { nome: "cPrompt", tipo: "Caractere", descricao: "Mensagem de texto inicial exibida na barra.", opcional: true },
      { nome: "lClock", tipo: "Lógico", descricao: "Se .T., exibe relógio na barra. Padrão: .F.", opcional: true },
      { nome: "lKeyBoard", tipo: "Lógico", descricao: "Se .T., exibe indicadores do teclado. Padrão: .F.", opcional: true },
      { nome: "lDate", tipo: "Lógico", descricao: "Se .T., exibe data atual na barra. Padrão: .F.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Barra de mensagens informativa em janela principal
User Function ExTMsgBar()
    Local oDlg := Nil
    Local oBar := Nil

    DEFINE MSDIALOG oDlg TITLE "Painel de Controle" FROM 0, 0 TO 350, 600 PIXEL

    oBar := TMsgBar():New(oDlg, "Pronto para processamento...", .T., .T., .T.)

    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "Pergunte",
    categoria: "Mensagens e Telas",
    sintaxe: "Pergunte( <cGrupo>, [<lShow>], [<cTitulo>] )",
    retorno: "Lógico (.T. se confirmado pelo usuário ou carregado, .F. se cancelado)",
    descricaoCurta: "Carrega ou exibe a tela de perguntas cadastrada no dicionário SX1, preenchendo as variáveis MV_PARxx.",
    descricaoDetalhada: "Invoca o conjunto de perguntas e parâmetros configurado no SX1 para a rotina. Se lShow for .T., abre a tela interativa para o usuário preencher; se for .F., apenas lê os últimos valores gravados no perfil do usuário para as variáveis de memória MV_PAR01, MV_PAR02, etc.",
    parametros: [
      { nome: "cGrupo", tipo: "Caractere", descricao: "Nome identificador do grupo de perguntas no SX1 (até 10 caracteres).", opcional: false },
      { nome: "lShow", tipo: "Lógico", descricao: "Se .T., exibe a interface; se .F., carrega em silêncio. Padrão: .T.", opcional: true },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título personalizado da janela de parâmetros.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Leitura interativa de parâmetros cadastrados no SX1
User Function ExPergunte()
    Local cGrupo := "MTR010"

    // Abre diálogo de perguntas para o usuário
    If Pergunte(cGrupo, .T., "Parâmetros do Relatório")
        ConOut("Cliente De:  " + MV_PAR01)
        ConOut("Cliente Até: " + MV_PAR02)
        ConOut("Data Base:   " + DToC(MV_PAR03))
    Else
        ConOut("Operação cancelada pelo usuário.")
    EndIf
Return`
  },
  {
    nome: "ParamBox",
    categoria: "Mensagens e Telas",
    sintaxe: "ParamBox( <aParametros>, [<cTitulo>], [<aRetorno>], [<bOk>], [<aButtons>], [<lCentered>], [<nPosX>], [<nPosY>], [<oMainWnd>], [<cLoad>], [<lCanSave>], [<lUserSave>] )",
    retorno: "Lógico (.T. se o usuário confirmou com OK, .F. se cancelou)",
    descricaoCurta: "Exibe uma tela modal dinâmica para preenchimento de parâmetros configurados em array sem cadastro no SX1.",
    descricaoDetalhada: "Permite criar telas de filtros e parâmetros dinâmicos em tempo de execução via array de configuração, suportando campos tipo Get texto, Get numérico, datas, combos de opções e caixas de seleção, sem depender de registros no dicionário SX1.",
    parametros: [
      { nome: "aParametros", tipo: "Array", descricao: "Estrutura com a definição de cada pergunta/campo.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título exibido na janela modal de parâmetros.", opcional: true },
      { nome: "aRetorno", tipo: "Array", descricao: "Vetor passado por referência que recebe os valores digitados.", opcional: true },
      { nome: "bOk", tipo: "Bloco de Código", descricao: "Bloco de validação geral executado ao confirmar.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Parâmetros dinâmicos em tempo de execução com ParamBox
User Function ExParamBox()
    Local aParams := {}
    Local aRet    := {}

    // Parâmetro 1: Campo Texto (Tipo 1: Descrição, Variável, Picture, Validação, F3, Obrigatório)
    AAdd(aParams, {1, "Produto De",  Space(15), "@!", "", "SB1", "", 60, .T.})
    AAdd(aParams, {1, "Produto Até", Replicate("Z", 15), "@!", "", "SB1", "", 60, .T.})

    If ParamBox(aParams, "Filtro de Processamento", @aRet)
        ConOut("Faixa selecionada: " + aRet[1] + " até " + aRet[2])
    EndIf
Return`
  },
  {
    nome: "ConPad1",
    categoria: "Mensagens e Telas",
    sintaxe: "ConPad1( [<cAlias>], [<nOrdem>], [<cChave>], [<cCondicao>] )",
    retorno: "Lógico (.T. se selecionado um registro, .F. se cancelado)",
    descricaoCurta: "Abre a consulta padrão (F3) do Protheus associada a uma tabela e retorna o item selecionado.",
    descricaoDetalhada: "Invoca a janela de pesquisa e consulta padrão de dados (tecla de atalho F3). Permite ao operador pesquisar registros por índice, filtrar resultados e selecionar um valor que será posicionado na tabela e devolvido à rotina.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela para a consulta F3 (ex: 'SA1', 'SB1').", opcional: true },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem inicial de pesquisa na consulta.", opcional: true },
      { nome: "cChave", tipo: "Caractere", descricao: "Chave inicial de posicionamento.", opcional: true },
      { nome: "cCondicao", tipo: "Caractere", descricao: "Expressão de filtro temporário para a consulta.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Abertura manual da consulta F3 de clientes
User Function ExConPad1()
    DbSelectArea("SA1")
    DbSetOrder(1)

    // Abre janela padrão F3 para seleção de cliente
    If ConPad1("SA1", 1, xFilial("SA1"))
        MsgInfo("Cliente escolhido: " + SA1->A1_COD + " - " + SA1->A1_NOME, "Seleção F3")
    Else
        ConOut("Seleção F3 cancelada.")
    EndIf
Return`
  },
  {
    nome: "AxCadastro",
    categoria: "Mensagens e Telas",
    sintaxe: "AxCadastro( <cAlias>, <cTitle>, [<cVldExc>], [<cVldAlt>] )",
    retorno: "NIL",
    descricaoCurta: "Cria e executa uma interface completa e padrão de cadastro Protheus (Browse com CRUD completo).",
    descricaoDetalhada: "Função clássica fundamental para geração rápida de telas de cadastro (CRUD) no Protheus. Monta automaticamente o MBrowse com base no dicionário de dados (SX2/SX3/SIX), fornecendo os botões de ação e permitindo definir validações customizadas para exclusão e alteração.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela no dicionário de dados (ex: 'SA1', 'SZ1').", opcional: false },
      { nome: "cTitle", tipo: "Caractere", descricao: "Título exibido na barra superior da janela de cadastro.", opcional: false },
      { nome: "cVldExc", tipo: "Caractere", descricao: "Função ou expressão ADVPL executada para validar a exclusão de registros.", opcional: true },
      { nome: "cVldAlt", tipo: "Caractere", descricao: "Função ou expressão ADVPL executada para validar a alteração de registros.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de cadastro rápido para tabela customizada
User Function CadTabela()
    Local cAlias   := "SZ1"
    Local cTitulo  := "Cadastro de Transportadoras Parceiras"
    Local cVldExc  := "U_VldExcSZ1()" // Validação prévia de exclusão
    Local cVldAlt  := ".T."            // Permite alteração

    AxCadastro(cAlias, cTitulo, cVldExc, cVldAlt)
Return

User Function VldExcSZ1()
    If SZ1->Z1_STATUS == "A"
        MsgAlert("Não é permitido excluir transportadora com status Ativo!", "Validação")
        Return .F.
    EndIf
Return .T.`
  },
  {
    nome: "AxInclui",
    categoria: "Mensagens e Telas",
    sintaxe: "AxInclui( <cAlias>, <nReg>, [<nOpc>], [<aAcho>], [<cFunc>], [<aCpos>], [<cTudoOk>], [<lF3>], [<cTransact>], [<aButtons>], [<aParam>] )",
    retorno: "Numérico (1 se confirmado ou 0 se cancelado)",
    descricaoCurta: "Abre a tela padrão de inclusão de registro (Enchoice) para a tabela informada.",
    descricaoDetalhada: "Invoca o formulário padrão de inclusão do Protheus baseado no SX3 para a tabela indicada por cAlias. Executa as validações de campo, validação de TudoOk e grava o novo registro caso confirmado.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela onde o registro será incluído.", opcional: false },
      { nome: "nReg", tipo: "Numérico", descricao: "Número do RecNo posicionado (normalmente RecNo() atual ou 0).", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Opção da rotina (padrão 3: Inclusão).", opcional: true },
      { nome: "aAcho", tipo: "Array", descricao: "Vetor com nomes dos campos a serem exibidos na interface.", opcional: true },
      { nome: "cFunc", tipo: "Caractere", descricao: "Função executada na validação de campos ou gatilhos.", opcional: true },
      { nome: "aCpos", tipo: "Array", descricao: "Vetor com a relação de campos editáveis.", opcional: true },
      { nome: "cTudoOk", tipo: "Caractere", descricao: "Expressão ou função ADVPL de validação final executada ao confirmar.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Abertura direta de tela padrão de inclusão
User Function IncCliente()
    Local nOpcao := 0

    DbSelectArea("SA1")
    nOpcao := AxInclui("SA1", RecNo(), 3, Nil, Nil, Nil, "U_CliTudoOk()")

    If nOpcao == 1
        ConOut("Cliente gravado com sucesso no banco de dados!")
    Else
        ConOut("Operação de inclusão cancelada pelo usuário.")
    EndIf
Return`
  },
  {
    nome: "AxAltera",
    categoria: "Mensagens e Telas",
    sintaxe: "AxAltera( <cAlias>, <nReg>, <nOpc>, [<aAcho>], [<aCpos>], [<nColMens>], [<cMensagem>], [<cTudoOk>], [<cTransact>], [<cFunc>], [<aButtons>], [<aParam>] )",
    retorno: "Numérico (1 se confirmado ou 0 se cancelado)",
    descricaoCurta: "Abre a tela padrão de alteração de registro para a tabela e RecNo posicionados.",
    descricaoDetalhada: "Exibe o diálogo de alteração de dados do registro corrente posicionado pelo RecNo (nReg). Aplica bloqueio de registro (RecLock), validações de campo e executa o bloco de TudoOk antes de comitar as alterações.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela do registro a alterar.", opcional: false },
      { nome: "nReg", tipo: "Numérico", descricao: "RecNo do registro que será alterado.", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Opção da operação (padrão 4: Alteração).", opcional: false },
      { nome: "aAcho", tipo: "Array", descricao: "Lista de campos visíveis na tela.", opcional: true },
      { nome: "aCpos", tipo: "Array", descricao: "Lista de campos permitidos para edição.", opcional: true },
      { nome: "cTudoOk", tipo: "Caractere", descricao: "Validação final para permitir a confirmação da alteração.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Tela padrão de alteração com bloqueio automático
User Function AltCliente()
    DbSelectArea("SA1")
    DbSetOrder(1)

    If DbSeek(xFilial("SA1") + "00000101")
        If AxAltera("SA1", SA1->(RecNo()), 4, Nil, Nil, Nil, Nil, "U_AltTudoOk()") == 1
            MsgInfo("Alterações salvas com sucesso!", "Protheus")
        EndIf
    EndIf
Return`
  },
  {
    nome: "AxDeleta",
    categoria: "Mensagens e Telas",
    sintaxe: "AxDeleta( <cAlias>, <nReg>, <nOpc>, [<cFunc>], [<cTudoOk>], [<aAcho>], [<aCpos>], [<cTransact>] )",
    retorno: "Numérico (1 se excluído ou 0 se cancelado)",
    descricaoCurta: "Abre a tela de confirmação e executa a exclusão padrão de um registro da tabela.",
    descricaoDetalhada: "Apresenta os dados do registro para conferência do usuário e confirmação de exclusão. Se confirmado e atendidas as validações de exclusão, marca o registro como deletado (DbDelete) e libera bloqueios.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela do registro a excluir.", opcional: false },
      { nome: "nReg", tipo: "Numérico", descricao: "Número de RecNo do registro posicionado.", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Opção da rotina (padrão 5: Exclusão).", opcional: false },
      { nome: "cFunc", tipo: "Caractere", descricao: "Função complementar de validação da exclusão.", opcional: true },
      { nome: "cTudoOk", tipo: "Caractere", descricao: "Validação de confirmação de exclusão.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Exclusão com confirmação visual
User Function DelCliente()
    DbSelectArea("SA1")

    If AxDeleta("SA1", SA1->(RecNo()), 5) == 1
        ConOut("Registro excluído da tabela SA1.")
    EndIf
Return`
  },
  {
    nome: "AxVisual",
    categoria: "Mensagens e Telas",
    sintaxe: "AxVisual( <cAlias>, <nReg>, <nOpc>, [<aAcho>], [<nColMens>], [<cMensagem>], [<cFunc>], [<aButtons>], [<aParam>] )",
    retorno: "Numérico (1 ao fechar a tela)",
    descricaoCurta: "Abre a tela de visualização somente leitura dos dados do registro posicionado.",
    descricaoDetalhada: "Carrega os campos da tabela em modo somente leitura (desabilitados para edição), permitindo ao usuário consultar todas as informações do registro posicionado sem risco de alteração acidental.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela a consultar.", opcional: false },
      { nome: "nReg", tipo: "Numérico", descricao: "Número de RecNo do registro a visualizar.", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Opção da rotina (padrão 2: Visualização).", opcional: false },
      { nome: "aAcho", tipo: "Array", descricao: "Lista dos campos a exibir na visualização.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Visualização rápida de registro sem edição
User Function VisRegistro()
    DbSelectArea("SB1")
    AxVisual("SB1", SB1->(RecNo()), 2)
Return`
  },
  {
    nome: "MBrowse",
    categoria: "Mensagens e Telas",
    sintaxe: "MBrowse( [<nLin1>], [<nCol1>], [<nLin2>], [<nCol2>], <cAlias>, [<aFixe>], [<cCpo>], [<nPar8>], [<cPar9>], [<nPar10>], [<aColors>], [<uPar12>], [<uPar13>], [<uPar14>], [<uPar15>], [<lTopFun>], [<lBotFun>] )",
    retorno: "NIL",
    descricaoCurta: "Constrói a grade clássica de navegação e listagem de registros em tabela do Protheus.",
    descricaoDetalhada: "Função clássica essencial de listagem em grade do Protheus (escrita sem o 'r' final: MBrowse, embora muitos pesquisem por 'MBrowser'). Diferencia-se do moderno FWMBrowse por utilizar o padrão procedural legado do Protheus, exibindo colunas do SX3, barra de ferramentas e suporte a legendas de cores via aColors.",
    parametros: [
      { nome: "nLin1, nCol1, nLin2, nCol2", tipo: "Numéricos", descricao: "Coordenadas de posicionamento da janela (opcional, padrão tela cheia).", opcional: true },
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela principal exibida no browse.", opcional: false },
      { nome: "aFixe", tipo: "Array", descricao: "Vetor de colunas fixadas no grid.", opcional: true },
      { nome: "cCpo", tipo: "Caractere", descricao: "Campo inicial para pesquisa.", opcional: true },
      { nome: "aColors", tipo: "Array", descricao: "Matriz de regras de cores e status de linhas (ex: {{'C5_TIPO==\"N\"', 'BR_VERDE'}}).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Browse clássico com menu de operações e cores
User Function MeuBrowse()
    Private cCadastro := "Cadastro de Produtos Especiais"
    Private aRotina   := {}

    // Define menu padrão
    AAdd(aRotina, {"Pesquisar",  "AxPesqui", 0, 1})
    AAdd(aRotina, {"Visualizar", "AxVisual", 0, 2})
    AAdd(aRotina, {"Incluir",    "AxInclui", 0, 3})
    AAdd(aRotina, {"Alterar",    "AxAltera", 0, 4})
    AAdd(aRotina, {"Excluir",    "AxDeleta", 0, 5})

    DbSelectArea("SB1")
    DbSetOrder(1)

    // Aciona o MBrowse clássico
    MBrowse(,,,,"SB1")
Return`
  },
  {
    nome: "BrwLegenda",
    categoria: "Mensagens e Telas",
    sintaxe: "BrwLegenda( <cTitulo>, <cDescricao>, <aLegenda> )",
    retorno: "NIL",
    descricaoCurta: "Exibe uma janela modal informativa com a legenda visual de cores dos registros do browse.",
    descricaoDetalhada: "Apresenta ao operador um diálogo contendo as cores de status (semáforo) e suas respectivas descrições textuais, explicando os critérios que determinam as cores dos registros no MBrowse ou FWMBrowse.",
    parametros: [
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título exibido na barra superior da janela de legenda.", opcional: false },
      { nome: "cDescricao", tipo: "Caractere", descricao: "Subtítulo ou mensagem introdutória explicativa.", opcional: false },
      { nome: "aLegenda", tipo: "Array", descricao: "Matriz de pares com identificador da cor e texto descritivo.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Exibição da legenda de status do browse
User Function ExBrwLegenda()
    Local aCores := {}

    AAdd(aCores, {"BR_VERDE",    "Pedido Liberado"})
    AAdd(aCores, {"BR_AMARELO",  "Pedido Bloqueado por Crédito"})
    AAdd(aCores, {"BR_VERMELHO", "Pedido Faturado"})
    AAdd(aCores, {"BR_AZUL",     "Pedido Cancelado"})

    BrwLegenda("Legenda de Status", "Status dos Pedidos de Venda:", aCores)
Return`
  },
  {
    nome: "MaWndBrowse",
    categoria: "Mensagens e Telas",
    sintaxe: "MaWndBrowse( [<nTop>], [<nLeft>], [<nBottom>], [<nRight>], <cAlias>, [<aFixe>], [<aRotina>], [<aColors>], [<cFiltro>], [<bBloco>] )",
    retorno: "Objeto (Instância da janela de browse)",
    descricaoCurta: "Cria e encapsula uma janela de browse completa integrada às rotinas e menus definidos em aRotina.",
    descricaoDetalhada: "Rotina de controle do browse clássico de módulos padrão do Protheus (como Faturamento, Estoque e Compras), vinculando a navegação na tabela diretamente ao vetor de operações aRotina e suas opções de menu.",
    parametros: [
      { nome: "nTop, nLeft, nBottom, nRight", tipo: "Numéricos", descricao: "Dimensões da janela em pixels.", opcional: true },
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela gerenciada.", opcional: false },
      { nome: "aFixe", tipo: "Array", descricao: "Vetor com os campos fixados à esquerda.", opcional: true },
      { nome: "aRotina", tipo: "Array", descricao: "Estrutura do menu de operações da tela.", opcional: true },
      { nome: "aColors", tipo: "Array", descricao: "Vetor de legendas e cores condicionais.", opcional: true },
      { nome: "cFiltro", tipo: "Caractere", descricao: "Expressão de filtro aplicada à tabela.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de browse com MaWndBrowse
User Function ExMaWndBrowse()
    Local oBrowse := Nil

    DbSelectArea("SC5")
    DbSetOrder(1)

    oBrowse := MaWndBrowse(0, 0, 400, 600, "SC5", Nil, aRotina)
Return oBrowse`
  },
  {
    nome: "Enchoice",
    categoria: "Mensagens e Telas",
    sintaxe: "Enchoice( <cAlias>, <nReg>, <nOpc>, [<aAcho>], [<cFunc>], [<aCpos>], [<oDlg>], [<lF3>], [<aCols>], [<aHeader>], [<lTop>], [<lBot>] )",
    retorno: "Objeto / NIL",
    descricaoCurta: "Monta a área de cabeçalho de formulários com campos editáveis baseados no dicionário SX3.",
    descricaoDetalhada: "Componente clássico de interface para desenho de telas no padrão Protheus. Desenha os campos da tabela em grupos/pastas na parte superior da tela (cabeçalho), frequentemente associado ao MsGetDados para compor formulários mestre-detalhe (como Pedidos de Venda e Notas Fiscais).",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela que fornece os campos do cabeçalho.", opcional: false },
      { nome: "nReg", tipo: "Numérico", descricao: "RecNo do registro posicionado.", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Opção da operação (3: Inclui, 4: Altera, 2: Visualiza).", opcional: false },
      { nome: "aAcho", tipo: "Array", descricao: "Lista dos campos visíveis na área do cabeçalho.", opcional: true },
      { nome: "oDlg", tipo: "Objeto", descricao: "Janela pai (TDialog) onde o cabeçalho será renderizado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Construção de cabeçalho Enchoice em diálogo modal
User Function ExEnchoice()
    Local oDlg := Nil

    DEFINE MSDIALOG oDlg TITLE "Pedido de Venda" FROM 0, 0 TO 500, 700 PIXEL

    // Desenha o cabeçalho do pedido (SC5)
    Enchoice("SC5", SC5->(RecNo()), 3, Nil, Nil, Nil, oDlg)

    ACTIVATE MSDIALOG oDlg CENTERED
Return`
  },
  {
    nome: "MsGetDados",
    categoria: "Mensagens e Telas",
    sintaxe: "MsGetDados( <nTop>, <nLeft>, <nBottom>, <nRight>, <nOpc>, [<cLinOk>], [<cTudOk>], [<cFieldOk>], [<lVirtual>], [<aAlter>], [<nFreeze>], [<nMaxLin>], [<cFieldAuto>], [<cFieldDel>], [<oWnd>], [<aHeader>], [<aCols>] )",
    retorno: "Objeto (Instância do controle de grid MsGetDados)",
    descricaoCurta: "Cria uma grade clássica (grid de itens) editável com validação linha a linha e exclusão.",
    descricaoDetalhada: "Componente legado essencial para telas mestre-detalhe no Protheus. Gerencia a matriz aCols (linhas de dados) e o vetor aHeader (definição das colunas), provendo suporte a inserção de linhas, exclusão com tecla Delete e validações de linha (cLinOk) e total (cTudOk).",
    parametros: [
      { nome: "nTop, nLeft, nBottom, nRight", tipo: "Numéricos", descricao: "Coordenadas do grid na janela pai em pixels.", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Opção da rotina (3: Inclusão, 4: Alteração, 2: Visualização).", opcional: false },
      { nome: "cLinOk", tipo: "Caractere", descricao: "Função ou expressão ADVPL executada ao trocar ou validar linha.", opcional: true },
      { nome: "cTudOk", tipo: "Caractere", descricao: "Validação geral de todas as linhas do grid ao confirmar.", opcional: true },
      { nome: "oWnd", tipo: "Objeto", descricao: "Diálogo container pai (TDialog/MSDialog).", opcional: true },
      { nome: "aHeader", tipo: "Array", descricao: "Estrutura descritiva das colunas do grid.", opcional: true },
      { nome: "aCols", tipo: "Array", descricao: "Matriz multidimensional contendo os dados das linhas.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de grid clássico de itens com MsGetDados
User Function ExMsGetDados(oDlg, aHeader, aCols)
    Local oGrid := Nil

    // Cria grid de itens editável na parte inferior do diálogo
    oGrid := MsGetDados(150, 10, 320, 480, 3, "U_LinhaOk()", "U_TudoOk()", "", .F., Nil, 2, 999, "", "", oDlg, aHeader, aCols)
Return oGrid`
  },
  {
    nome: "MsNewGetDados",
    categoria: "Mensagens e Telas",
    sintaxe: "MsNewGetDados():New( <nTop>, <nLeft>, <nBottom>, <nRight>, [<nOpc>], [<cLinOk>], [<cTudOk>], [<cFieldOk>], [<aAlter>], [<nFreeze>], [<nMaxLin>], [<cFieldAuto>], [<cFieldDel>], [<oWnd>], [<aHeader>], [<aCols>] )",
    retorno: "Objeto (Instância da classe MsNewGetDados)",
    descricaoCurta: "Classe orientada a objetos para criação de grades editáveis de itens (evolução do MsGetDados).",
    descricaoDetalhada: "Evolução em classe do MsGetDados tradicional. Proporciona controle dinâmico dos métodos de grid (:oBrowse, :Refresh(), :nAt, :ForceRefresh()), facilitando o manuseio de colunas, congelamento e validação de matrizes aHeader e aCols em janelas customizadas.",
    parametros: [
      { nome: "nTop, nLeft, nBottom, nRight", tipo: "Numéricos", descricao: "Posicionamento e dimensões do grid em pixels.", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Código da operação (3: Inclusão, 4: Alteração, 2: Visualização).", opcional: true },
      { nome: "cLinOk", tipo: "Caractere", descricao: "Validação de linha executada ao avançar/trocar registro.", opcional: true },
      { nome: "cTudOk", tipo: "Caractere", descricao: "Validação global de todas as linhas preenchidas.", opcional: true },
      { nome: "oWnd", tipo: "Objeto", descricao: "Container pai (TDialog ou MSDialog).", opcional: true },
      { nome: "aHeader", tipo: "Array", descricao: "Vetor de cabeçalhos das colunas.", opcional: true },
      { nome: "aCols", tipo: "Array", descricao: "Matriz com os dados e linhas da grade.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Grid orientado a objetos com métodos da classe
User Function ExMsNewGetDados(oDlg, aHeader, aCols)
    Local oNewGrid := Nil

    oNewGrid := MsNewGetDados():New(160, 10, 330, 500, 3, "U_LinOk()", "U_TudOk()",,,, 999,,, oDlg, aHeader, aCols)
    oNewGrid:oBrowse:bChange := {|| ConOut("Linha atual: " + Str(oNewGrid:nAt)) }
Return oNewGrid`
  },
  {
    nome: "SetKey",
    categoria: "Mensagens e Telas",
    sintaxe: "SetKey( <nKey>, [<bAction>] )",
    retorno: "Bloco de Código (Ação anterior associada à tecla ou NIL)",
    descricaoCurta: "Associa ou desassocia uma ação em bloco de código a uma tecla de atalho do teclado (F1 a F12).",
    descricaoDetalhada: "Função nativa para captura global de teclas de função ou atalhos em interfaces do Protheus. Muito utilizada para acionar consultas rápidas, calculadoras, janelas de ajuda customizadas ou rotinas auxiliares quando o operador pressiona teclas específicas como F4, F5, F6, etc.",
    parametros: [
      { nome: "nKey", tipo: "Numérico", descricao: "Código da tecla de função (ex: -3 para F4, -4 para F5, -5 para F6).", opcional: false },
      { nome: "bAction", tipo: "Bloco de Código", descricao: "Bloco de código executado quando a tecla for pressionada. Se omitido, desassocia.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Vinculação de tecla F5 para consulta de estoque
User Function ConfiguraAtalhos()
    // Tecla F5 (código -4 no InKey)
    SetKey(-4, {|| U_ConsultaSaldoEstoque()})
    ConOut("Atalho F5 configurado para consulta de estoque.")
Return`
  }
);
