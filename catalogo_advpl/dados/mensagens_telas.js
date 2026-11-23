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
  }
);
