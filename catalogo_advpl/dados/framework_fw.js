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
  },
  {
    nome: "FWMBrowse",
    categoria: "Framework Protheus",
    sintaxe: "FWMBrowse():New()",
    retorno: "Objeto (Instância da classe FWMBrowse)",
    descricaoCurta: "Instancia e gerencia o componente oficial de navegação e listagem de registros em tabelas (Browse Protheus).",
    descricaoDetalhada: "Componente visual padrão de grids de dados do Protheus. Suporta colunas com legendas, paginação, filtros avançados, botões de ação e integração com MVC.",
    parametros: [],
    exemplo: `// Exemplo prático: Construção de tela de Browse com FWMBrowse
User Function ExFWMBrowse()
    Local oBrowse := FWMBrowse():New()

    oBrowse:SetAlias("SA1")
    oBrowse:SetDescription("Cadastro de Clientes")
    oBrowse:Activate()
Return`
  },
  {
    nome: "FwLoadMenuDef",
    categoria: "Framework Protheus",
    sintaxe: "FwLoadMenuDef( <cRotina> )",
    retorno: "Array (Estrutura do menu de operações)",
    descricaoCurta: "Carrega dinamicamente a definição de menus (MenuDef) de uma rotina Protheus.",
    descricaoDetalhada: "Lê e compõe o array de opções de aRotina/MenuDef de um fonte MVC ou padrão Protheus, retornando as ações de Visualizar, Incluir, Alterar e Excluir.",
    parametros: [
      { nome: "cRotina", tipo: "Caractere", descricao: "Nome do fonte onde reside o MenuDef (ex: 'MATA010').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Carregamento dinâmico de opções de menu
User Function ExFwLoadMenuDef()
    Local aMenu := FwLoadMenuDef("MATA030")
    ConOut("Total de opções no menu da rotina: " + cValToChar(Len(aMenu)))
Return`
  },
  {
    nome: "FWModelActive",
    categoria: "Framework Protheus",
    sintaxe: "FWModelActive()",
    retorno: "Objeto (Instância de MPFormModel) ou NIL",
    descricaoCurta: "Retorna o modelo de dados MVC ativo na thread corrente de execução.",
    descricaoDetalhada: "Permite obter referência direta ao objeto MPFormModel que está sendo manipulado em uma tela MVC em execução (em pontos de validação, gatilhos ou eventos).",
    parametros: [],
    exemplo: `// Exemplo prático: Obtenção do modelo MVC em tempo de execução
User Function ExFWModelActive()
    Local oModel := FWModelActive()

    If oModel != NIL
        ConOut("ID do modelo ativo: " + oModel:GetId())
        ConOut("Operação ativa: " + cValToChar(oModel:GetOperation()))
    EndIf
Return`
  },
  {
    nome: "FwFldGet",
    categoria: "Framework Protheus",
    sintaxe: "FwFldGet( <cCampo> )",
    retorno: "Qualquer tipo (Conteúdo atual do campo no modelo MVC)",
    descricaoCurta: "Obtém o valor de um campo diretamente do modelo de dados MVC ativo sem precisar instanciar objetos.",
    descricaoDetalhada: "Função atalho para leitura do buffer de dados de um campo do formulário MVC em edição. Muito utilizada em validações de linha (VldLine) e regras de pré-validação.",
    parametros: [
      { nome: "cCampo", tipo: "Caractere", descricao: "Nome do campo a obter o valor (ex: 'A1_COD').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Leitura de valor de campo no modelo MVC ativo
User Function ExFwFldGet()
    Local cCodCliente := FwFldGet("A1_COD")
    ConOut("Código preenchido no formulário MVC: " + cCodCliente)
Return`
  },
  {
    nome: "FwFldPut",
    categoria: "Framework Protheus",
    sintaxe: "FwFldPut( <cCampo>, <xConteudo> )",
    retorno: "Lógico (.T. se atribuição realizada)",
    descricaoCurta: "Atribui um novo valor a um campo do formulário no modelo de dados MVC ativo.",
    descricaoDetalhada: "Atualiza o buffer do modelo de dados MVC sem necessidade de manipular manualmente o submodelo. Dispara as regras de validação associadas ao campo se configurado.",
    parametros: [
      { nome: "cCampo", tipo: "Caractere", descricao: "Nome do campo a ser modificado.", opcional: false },
      { nome: "xConteudo", tipo: "Qualquer tipo", descricao: "Novo valor a ser atribuído.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Atribuição de valor em campo MVC ativo
User Function ExFwFldPut()
    FwFldPut("A1_TIPO", "F")
    ConOut("Campo A1_TIPO atualizado para 'F'.")
Return`
  },
  {
    nome: "MPFormModel",
    categoria: "Framework Protheus",
    sintaxe: "MPFormModel():New( <cIdModel>, [<bPreValid>], [<bPosValid>], [<bCommit>], [<bCancel>] )",
    retorno: "Objeto (Instância da classe MPFormModel)",
    descricaoCurta: "Classe central de Modelo de Dados do Framework MVC no Protheus para regras de negócio e validações.",
    descricaoDetalhada: "Coração do MVC no Protheus. Representa o Modelo (Model) que isola totalmente a regra de negócio da interface visual, gerenciando componentes de formulário (FWFormModelStruct), submodelos de itens (Grid), eventos de pré/pós-validação e comutação segura no banco de dados.",
    parametros: [
      { nome: "cIdModel", tipo: "Caractere", descricao: "Identificador único do modelo de dados (ex: 'COMP011M').", opcional: false },
      { nome: "bPreValid", tipo: "Bloco de Código", descricao: "Bloco de pré-validação antes da edição dos dados.", opcional: true },
      { nome: "bPosValid", tipo: "Bloco de Código", descricao: "Bloco de pós-validação executado ao confirmar o formulário.", opcional: true },
      { nome: "bCommit", tipo: "Bloco de Código", descricao: "Bloco customizado de persistência no banco de dados.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Definição da função ModelDef padrão MVC
Static Function ModelDef()
    Local oModel := MPFormModel():New("MEUMODEL", /*bPre*/, {|oMdl| MinhaPosValid(oMdl)})
    Local oStruSA1 := FWFormStruct(1, "SA1")

    oModel:AddFields("SA1MASTER", /*cOwner*/, oStruSA1)
    oModel:SetDescription("Modelo de Clientes MVC")
Return oModel`
  },
  {
    nome: "FWFormStruct",
    categoria: "Framework Protheus",
    sintaxe: "FWFormStruct( <nTipo>, <cAlias>, [<bAvalCampo>] )",
    retorno: "Objeto (Instância de FWFormModelStruct ou FWFormViewStruct)",
    descricaoCurta: "Cria a estrutura de metadados e validações para modelos e visões MVC com base no dicionário SX3.",
    descricaoDetalhada: "Função essencial de construção no padrão MVC. Quando nTipo é 1 (MODEL), monta a estrutura de regras e campos para o Model; quando nTipo é 2 (VIEW), monta as propriedades visuais de interface (Picture, Título, Pasta, Ordem) para a View.",
    parametros: [
      { nome: "nTipo", tipo: "Numérico", descricao: "Tipo de estrutura desejada (1 = ModelStruct, 2 = ViewStruct).", opcional: false },
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela no dicionário SX3 (ex: 'SA1', 'SB1').", opcional: false },
      { nome: "bAvalCampo", tipo: "Bloco de Código", descricao: "Filtro opcional para seleção de campos específicos.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de estruturas Model e View via FWFormStruct
User Function ExFWFormStruct()
    // Estrutura de dados para o Model
    Local oStructModel := FWFormStruct(1, "SB1")

    // Estrutura visual para a View
    Local oStructView  := FWFormStruct(2, "SB1")

    ConOut("Estruturas criadas com sucesso para a tabela SB1.")
Return`
  },
  {
    nome: "FWFormView",
    categoria: "Framework Protheus",
    sintaxe: "FWFormView():New()",
    retorno: "Objeto (Instância da classe FWFormView)",
    descricaoCurta: "Classe de Visão (View) do Framework MVC responsável pela interface gráfica e layout de formulários.",
    descricaoDetalhada: "Gerencia a interface de usuário no MVC do Protheus. Define a disposição visual de painéis, formulários (FormFields), grades (FormGrid), agrupamento em abas/pastas horizontais ou verticais e amarração aos submodelos do MPFormModel.",
    parametros: [],
    exemplo: `// Exemplo prático: Definição da função ViewDef padrão MVC
Static Function ViewDef()
    Local oModel := FWLoadModel("MEUMODEL")
    Local oView  := FWFormView():New()
    Local oStru  := FWFormStruct(2, "SA1")

    oView:SetModel(oModel)
    oView:AddField("VIEW_SA1", oStru, "SA1MASTER")
    oView:CreateHorizontalBox("TELA_PRINCIPAL", 100)
    oView:SetOwnerView("VIEW_SA1", "TELA_PRINCIPAL")
Return oView`
  },
  {
    nome: "MPReport",
    categoria: "Framework Protheus",
    sintaxe: "MPReport():New( <cReport>, <cTitle>, [<uParam>], [<bAction>], [<cDescription>] )",
    retorno: "Objeto (Instância da classe MPReport)",
    descricaoCurta: "Classe base de geração de relatórios integrados ao Framework Protheus (evolução do TReport).",
    descricaoDetalhada: "Classe do TOTVS Framework que herda e expande o TReport, fornecendo recursos aprimorados para internacionalização, gráficos integrados, suporte a exportação nativa e compatibilidade total com dicionários de parâmetros.",
    parametros: [
      { nome: "cReport", tipo: "Caractere", descricao: "Nome identificador interno do relatório.", opcional: false },
      { nome: "cTitle", tipo: "Caractere", descricao: "Título principal do relatório.", opcional: false },
      { nome: "uParam", tipo: "Caractere / Array", descricao: "Grupo de perguntas do SX1 para filtros.", opcional: true },
      { nome: "bAction", tipo: "Bloco de Código", descricao: "Bloco de código de processamento e impressão das seções.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de relatório integrado com MPReport
User Function RelFaturamento()
    Local oReport := MPReport():New("RELFAT", "Faturamento Mensal", "MTR500", {|oRpt| ImprimeRel(oRpt)})
    oReport:PrintDialog()
Return`
  },
  {
    nome: "FWMVCRotAuto",
    categoria: "Framework Protheus",
    sintaxe: "FWMVCRotAuto( <oModel>, <cAlias>, <nOpc>, [<aAutoCab>], [<aAutoItens>] )",
    retorno: "Lógico (.T. se processado com sucesso, .F. caso ocorra erro)",
    descricaoCurta: "Executa uma rotina automática em segundo plano para fontes desenvolvidos na arquitetura MVC.",
    descricaoDetalhada: "Equivalente moderno do MsExecAuto() para programas desenvolvidos em MVC. Carrega o MPFormModel da rotina sem interface gráfica, alimenta os campos de cabeçalho e linhas de itens através de arrays e valida todas as regras do modelo, retornando o status da gravação.",
    parametros: [
      { nome: "oModel", tipo: "Objeto", descricao: "Instância carregada do MPFormModel da rotina.", opcional: false },
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela principal gerenciada pelo modelo.", opcional: false },
      { nome: "nOpc", tipo: "Numérico", descricao: "Opção da operação (3: Inclusão, 4: Alteração, 5: Exclusão).", opcional: false },
      { nome: "aAutoCab", tipo: "Array", descricao: "Vetor com os campos do cabeçalho {{campo, valor, nil}}.", opcional: true },
      { nome: "aAutoItens", tipo: "Array", descricao: "Matriz com as linhas dos itens para modelos mestre-detalhe.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Execução de rotina automática MVC sem interface
User Function IncClienteMVC()
    Local oModel   := FWLoadModel("CRMA980") // Modelo padrão de clientes
    Local aCampos  := {}
    Local lSucesso := .F.

    AAdd(aCampos, {"A1_COD",  "CLI001", Nil})
    AAdd(aCampos, {"A1_LOJA", "01",     Nil})
    AAdd(aCampos, {"A1_NOME", "NOVO CLIENTE SA", Nil})

    lSucesso := FWMVCRotAuto(oModel, "SA1", 3, aCampos)
    If lSucesso
        ConOut("Cliente inserido via rotina automática MVC!")
    EndIf
Return lSucesso`
  },
  {
    nome: "FWLogMsg",
    categoria: "Framework Protheus",
    sintaxe: "FWLogMsg( <cSeveridade>, [<cMsgId>], <cGrupo>, <cSubGrupo>, [<cMensagem>], [<cSolucao>] )",
    retorno: "NIL",
    descricaoCurta: "Registra mensagens estruturadas de auditoria, alerta e erro no serviço centralizado de log do Protheus.",
    descricaoDetalhada: "Mecanismo padrão moderno do Protheus para gravação de logs (console.log / TOTVS Log). Suporta severidades 'INFO', 'WARN', 'ERROR', 'FATAL' com rastreamento por categorias, facilitando a identificação de problemas em monitoramentos corporativos.",
    parametros: [
      { nome: "cSeveridade", tipo: "Caractere", descricao: "Nível do log: 'INFO', 'WARN', 'ERROR' ou 'FATAL'.", opcional: false },
      { nome: "cMsgId", tipo: "Caractere", descricao: "Identificador ou código único da mensagem.", opcional: true },
      { nome: "cGrupo", tipo: "Caractere", descricao: "Categoria ou módulo da aplicação (ex: 'FATURAMENTO').", opcional: false },
      { nome: "cSubGrupo", tipo: "Caractere", descricao: "Subgrupo ou rotina específica (ex: 'INTEGRACAO_API').", opcional: false },
      { nome: "cMensagem", tipo: "Caractere", descricao: "Texto descritivo do evento registrado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Gravação estruturada de log corporativo
User Function ExFWLogMsg()
    FWLogMsg("INFO", "LOG001", "INTEGRACOES", "REST_PEDIDOS", "Sincronização de pedidos iniciada com sucesso.")
    FWLogMsg("WARN", "LOG002", "INTEGRACOES", "REST_PEDIDOS", "Alerta: Tempo de resposta do parceiro acima de 3 segundos.")
Return`
  },
  {
    nome: "FWGetDialog",
    categoria: "Framework Protheus",
    sintaxe: "FWGetDialog( [<oWnd>] )",
    retorno: "Objeto (Instância da janela de diálogo ativa)",
    descricaoCurta: "Retorna o objeto da janela de diálogo (TDialog/MSDialog) atualmente ativa na pilha de execução.",
    descricaoDetalhada: "Função utilitária que permite recuperar o contexto visual da janela corrente em execução, muito útil em gatilhos, validações de campo ou pontos de entrada onde se precisa atualizar componentes de tela sem ter a variável do diálogo no escopo local.",
    parametros: [
      { nome: "oWnd", tipo: "Objeto", descricao: "Janela de referência inicial (opcional).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Recuperação da janela corrente em ponto de entrada
User Function ExFWGetDialog()
    Local oDlgAtual := FWGetDialog()

    If oDlgAtual != Nil
        ConOut("Janela ativa identificada. Atualizando componentes visuais...")
        oDlgAtual:Refresh()
    EndIf
Return`
  },
  {
    nome: "FWSX3Util",
    categoria: "Framework Protheus",
    sintaxe: "FWSX3Util():GetDescription( <cCampo> )",
    retorno: "Qualquer tipo (Varia conforme o método estático executado)",
    descricaoCurta: "Classe utilitária de alta performance para consulta de metadados e propriedades de campos do SX3 em memória.",
    descricaoDetalhada: "Disponibiliza métodos estáticos otimizados (:GetDescription, :GetTitle, :GetType, :GetSize, :GetDecimal, :GetValid) que consultam o cache de metadados do Protheus sem necessidade de realizar consultas lentas na tabela física do dicionário SX3.",
    parametros: [
      { nome: "cCampo", tipo: "Caractere", descricao: "Nome do campo no dicionário de dados (ex: 'A1_NOME').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Consulta ultrarrápida de propriedades do dicionário
User Function ExFWSX3Util()
    Local cTitulo := FWSX3Util():GetTitle("A1_NOME")
    Local cTipo   := FWSX3Util():GetType("A1_NOME")
    Local nTam    := FWSX3Util():GetSize("A1_NOME")

    ConOut("Campo: A1_NOME | Título: " + cTitulo + " | Tipo: " + cTipo + " | Tamanho: " + cValToChar(nTam))
Return`
  }
);
