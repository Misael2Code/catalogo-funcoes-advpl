/**
 * Catalogo de Funcoes ADVPL - Modulo Framework Protheus
 * Funcoes do framework TOTVS para gestao de filiais e regras corporativas
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "FWxFilial",
    categoria: "Framework Protheus",
    sintaxe: "FWxFilial( <cAlias> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Retorna o codigo da filial correspondente a tabela informada, considerando compartilhamento ou exclusividade.",
    descricaoDetalhada: "Funcao oficial do Framework Protheus (evolucao da tradicional xFilial). Consulta a configuracao de modo de acesso da tabela no dicionario SX2 (compartilhada ou exclusiva). Se a tabela for compartilhada para a empresa, retorna string vazia (''). Se for exclusiva, retorna o codigo da filial ativa no contexto (cFilAnt). Utilizada em todas as chaves de busca por indice no Protheus.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela cadastrada no SX2 (ex: 'SA1', 'SB1', 'SC5').", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Busca por chave primaria respeitando o modo de compartilhamento da tabela
User Function ExFWxFilial()
    Local cFilialSA1 := FWxFilial("SA1")
    Local cCodCli    := "000100"
    Local cLojaCli   := "01"

    DbSelectArea("SA1")
    DbSetOrder(1) // A1_FILIAL + A1_COD + A1_LOJA

    // Busca concatenando a filial retornada pela funcao oficial do framework
    If DbSeek(cFilialSA1 + cCodCli + cLojaCli)
        ConOut("Cliente localizado na filial: " + cFilialSA1)
        ConOut("Razao Social: " + SA1->A1_NOME)
    Else
        ConOut("Cliente nao encontrado para esta filial!")
    EndIf
Return`
  },
  {
    nome: "FWGetArea",
    categoria: "Framework Protheus",
    sintaxe: "FWGetArea()",
    retorno: "Array",
    descricaoCurta: "Salva o estado completo da área de trabalho ativa no Framework Protheus moderno.",
    descricaoDetalhada: "Evolução oficial e segura da função GetArea(). Captura de maneira robusta tabela ativa, ordem, índice, posição física e ponteiros de navegação do ambiente TOTVS.",
    parametros: [],
    exemplo: `// Exemplo prático: Preservação de contexto com FWGetArea e FWRestArea
User Function ExFWGetArea()
    Local aArea := FWGetArea()

    // Processamento secundário em outra tabela
    DbSelectArea("SE1")
    DbSetOrder(1)

    FWRestArea(aArea) // Restaura com total segurança
Return`
  },
  {
    nome: "FWRestArea",
    categoria: "Framework Protheus",
    sintaxe: "FWRestArea( <aArea> )",
    retorno: "NIL",
    descricaoCurta: "Restaura o estado e posicionamento de tabela previamente capturado com FWGetArea().",
    descricaoDetalhada: "Evolução oficial da função RestArea(). Restaura a tabela ativa, a ordem de índice e o registro posicionado capturados anteriormente por FWGetArea().",
    parametros: [
      { nome: "aArea", tipo: "Array", descricao: "Array gerado previamente pela função FWGetArea().", opcional: false }
    ],
    exemplo: `// Exemplo prático: Restauração de contexto
User Function ExFWRestArea()
    Local aArea := FWGetArea()

    DbSelectArea("SB1")
    DbGoTop()

    FWRestArea(aArea) // Retorna exatamente ao contexto anterior
Return`
  },
  {
    nome: "FWAlertInfo",
    categoria: "Framework Protheus",
    sintaxe: "FWAlertInfo( <cMensagem>, [<cTitulo>] )",
    retorno: "NIL",
    descricaoCurta: "Apresenta uma caixa de diálogo informativa moderna com o design visual atual do Protheus.",
    descricaoDetalhada: "Exibe diálogo informativo padronizado pelas classes modernas de interface da TOTVS. Substitui a tradicional MsgInfo() com suporte aprimorado a Protheus Web e SmartClient moderno.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto da mensagem informativa.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título do cabeçalho da janela (padrão: 'Informação').", opcional: true }
    ],
    exemplo: `// Exemplo prático: Mensagem informativa moderna
User Function ExFWAlertInfo()
    FWAlertInfo("Processo de importação concluído com sucesso!", "Sincronização")
Return`
  },
  {
    nome: "FWAlertSuccess",
    categoria: "Framework Protheus",
    sintaxe: "FWAlertSuccess( <cMensagem>, [<cTitulo>] )",
    retorno: "NIL",
    descricaoCurta: "Exibe uma notificação moderna de sucesso com ícone verde característico no Protheus.",
    descricaoDetalhada: "Componente moderno oficial da TOTVS para confirmações de sucesso em operações, amplamente empregado em rotinas MVC e PO-UI.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto da mensagem de sucesso.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título da notificação (padrão: 'Sucesso').", opcional: true }
    ],
    exemplo: `// Exemplo prático: Notificação de sucesso de faturamento
User Function ExFWAlertSuccess()
    FWAlertSuccess("Pedido de venda nº 004520 faturado com êxito!", "Faturamento")
Return`
  },
  {
    nome: "FWAlertWarning",
    categoria: "Framework Protheus",
    sintaxe: "FWAlertWarning( <cMensagem>, [<cTitulo>] )",
    retorno: "NIL",
    descricaoCurta: "Apresenta uma caixa de advertência/alerta no padrão visual moderno do Protheus.",
    descricaoDetalhada: "Alternativa contemporânea à função MsgAlert(), exibindo estilização moderna com destaque visual de advertência.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto da mensagem de advertência.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título do diálogo (padrão: 'Atenção').", opcional: true }
    ],
    exemplo: `// Exemplo prático: Alerta financeiro
User Function ExFWAlertWarning()
    FWAlertWarning("Atenção: Existem títulos vencidos para este fornecedor.", "Aviso Financeiro")
Return`
  },
  {
    nome: "FWAlertError",
    categoria: "Framework Protheus",
    sintaxe: "FWAlertError( <cMensagem>, [<cTitulo>] )",
    retorno: "NIL",
    descricaoCurta: "Exibe uma notificação de erro impeditivo no padrão visual moderno do Protheus.",
    descricaoDetalhada: "Alternativa moderna à função MsgStop(), utilizada para notificar o operador sobre erros graves, impeditivos ou falhas de validação de dados.",
    parametros: [
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto descritivo do erro ocorrido.", opcional: false },
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título do cabeçalho da janela (padrão: 'Erro').", opcional: true }
    ],
    exemplo: `// Exemplo prático: Notificação de erro operacional impeditivo
User Function ExFWAlertError()
    FWAlertError("Falha na gravação do registro: Saldo em estoque insuficiente.", "Erro Operacional")
Return`
  },
  {
    nome: "FWExecView",
    categoria: "Framework Protheus",
    sintaxe: "FWExecView( <cTitulo>, <cPrograma>, [<nOperacao>], [<oDlg>], [<bCloseOnOK>], [<bOk>], [<nPercent>] )",
    retorno: "Numérico (0 se confirmação ou 1 se cancelamento)",
    descricaoCurta: "Executa e abre uma interface visual baseada em arquitetura MVC (Model-View-Controller).",
    descricaoDetalhada: "Função primordial para acionamento de rotinas desenvolvidas no padrão MVC Protheus (operações de Visualização: 2, Inclusão: 3, Alteração: 4, Exclusão: 5).",
    parametros: [
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título exibido na barra superior da janela.", opcional: false },
      { nome: "cPrograma", tipo: "Caractere", descricao: "Nome do fonte/função que implementa o MVC (ex: 'MATA010').", opcional: false },
      { nome: "nOperacao", tipo: "Numérico", descricao: "Código da operação MVC (1: Pesquisar, 2: Visualizar, 3: Incluir, 4: Alterar, 5: Excluir). Padrão: 2.", opcional: true },
      { nome: "oDlg", tipo: "Objeto", descricao: "Janela mãe opcional para ancoragem modal.", opcional: true },
      { nome: "bCloseOnOK", tipo: "Bloco de Código", descricao: "Code-block avaliado ao fechar confirmando.", opcional: true },
      { nome: "bOk", tipo: "Bloco de Código", descricao: "Code-block executado na validação do botão OK.", opcional: true },
      { nome: "nPercent", tipo: "Numérico", descricao: "Percentual de dimensionamento da tela.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Abertura de rotina de cadastro em MVC
User Function ExFWExecView()
    // Abre a tela MVC de cadastro de clientes em modo de visualização (2)
    FWExecView("Visualizar Cliente", "MATA030", 2)
Return`
  },
  {
    nome: "FWTemporaryTable",
    categoria: "Framework Protheus",
    sintaxe: "FWTemporaryTable():New( [<cAlias>] )",
    retorno: "Objeto (Instância da classe FWTemporaryTable)",
    descricaoCurta: "Cria e gerencia tabelas temporárias físicas de alta performance no banco de dados relacional.",
    descricaoDetalhada: "Classe moderna do Protheus que substitui a criação de arquivos temporários em disco. Permite definir colunas (SetFields), índices (AddIndex) e criar a tabela fisicamente no banco com Create(), além de eliminação automática com Delete().",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias desejado para a tabela temporária (se omitido, gera via GetNextAlias()).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação e uso de tabela temporária relacional com FWTemporaryTable
User Function ExFWTemporaryTable()
    Local oTempTable := FWTemporaryTable():New("TMPCLI")
    Local aCampos    := {}

    // Define os campos da tabela temporária
    aAdd(aCampos, {"CODIGO" , "C", 6, 0})
    aAdd(aCampos, {"NOME"   , "C", 40, 0})
    aAdd(aCampos, {"VALOR"  , "N", 12, 2})

    oTempTable:SetFields(aCampos)
    oTempTable:AddIndex("1", {"CODIGO"})
    oTempTable:Create()

    // Gravação na tabela temporária
    RecLock("TMPCLI", .T.)
        TMPCLI->CODIGO := "000001"
        TMPCLI->NOME   := "CLIENTE TEMPORARIO"
        TMPCLI->VALOR  := 1500.00
    MsUnlock()

    // Elimina a tabela temporária do banco de dados
    oTempTable:Delete()
Return`
  }
);
