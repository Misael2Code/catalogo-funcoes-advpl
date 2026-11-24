/**
 * Catalogo de Funcoes ADVPL - Modulo Ambiente, Sessao e Debug
 * Funcoes essenciais para controle de contexto RPC, usuarios, auditoria de rede e inspecao de codigo
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "RpcSetEnv",
    categoria: "Ambiente e Sessão",
    sintaxe: "RpcSetEnv( <cEmpAnt>, <cFilAnt>, [<cEnvUser>], [<cEnvPass>], [<cEnvMod>], [<cFunName>], [<aTables>] )",
    retorno: "Lógico (.T. se o ambiente foi inicializado com sucesso, .F. caso contrário)",
    descricaoCurta: "Inicializa o ambiente Protheus (empresa, filial, tabelas e módulos) para rotinas em background e jobs.",
    descricaoDetalhada: "Prepara o contexto de execução de threads em segundo plano (Schedule, WebServices REST/SOAP, Jobs RPC) definindo a empresa ativa (cEmpAnt), filial (cFilAnt) e opcionalmente usuário e tabelas para abertura automática, estabelecendo todas as variáveis globais de ambiente como cEmpAnt, cFilAnt, dDataBase, etc.",
    parametros: [
      { nome: "cEmpAnt", tipo: "Caractere", descricao: "Código da empresa do grupo a ser aberta (ex: '99', '01').", opcional: false },
      { nome: "cFilAnt", tipo: "Caractere", descricao: "Código da filial da empresa a ser posicionada (ex: '01', '0101').", opcional: false },
      { nome: "cEnvUser", tipo: "Caractere", descricao: "Código ou login do usuário para a sessão. Padrão: 'admin'.", opcional: true },
      { nome: "cEnvPass", tipo: "Caractere", descricao: "Senha do usuário (criptografada ou em branco conforme ambiente).", opcional: true },
      { nome: "cEnvMod", tipo: "Caractere", descricao: "Sigla do módulo a carregar (ex: 'FAT', 'COM', 'FIN', 'EST').", opcional: true },
      { nome: "cFunName", tipo: "Caractere", descricao: "Nome da rotina principal executora (preenche FunName()).", opcional: true },
      { nome: "aTables", tipo: "Array", descricao: "Vetor com nomes de tabelas que devem ser abertas automaticamente.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Inicialização de ambiente em Job Schedule de integração
User Function JobSyncEstoque()
    Local cEmp := "99"
    Local cFil := "01"

    ConOut("[JOB] Inicializando ambiente Protheus...")
    If RpcSetEnv(cEmp, cFil, "admin", "", "EST", "U_JobSyncEstoque", {"SB1", "SB2"})
        ConOut("[JOB] Ambiente inicializado na empresa " + cEmpAnt + " / filial " + cFilAnt)
        
        // Executa o processamento do estoque
        U_ProcEstoque()

        // Descarrega o ambiente e libera licenças
        RpcClearEnv()
        ConOut("[JOB] Sessão encerrada com sucesso.")
    Else
        ConOut("[JOB] Falha ao inicializar RpcSetEnv!")
    EndIf
Return`
  },
  {
    nome: "RpcClearEnv",
    categoria: "Ambiente e Sessão",
    sintaxe: "RpcClearEnv()",
    retorno: "NIL",
    descricaoCurta: "Finaliza e descarrega o ambiente de execução Protheus previamente aberto por RpcSetEnv, liberando licenças.",
    descricaoDetalhada: "Encerra a sessão de trabalho aberta via RPC, fecha todas as áreas de tabelas ativas da thread, desconecta o banco de dados e libera as licenças de uso no License Server. Deve ser invocado obrigatoriamente no término de jobs ou rotinas em background.",
    parametros: [],
    exemplo: `// Exemplo prático: Encerramento seguro de job em bloco de tratamento
User Function ExRpcClearEnv()
    Local lOk := .F.

    RpcSetEnv("99", "01")

    // Bloco de processamento protegido
    lOk := U_IntegrarPedidos()

    // Libera a sessão, tabelas e conexões de rede
    RpcClearEnv()
    ConOut("Status da sincronização: " + IIf(lOk, "Sucesso", "Falha"))
Return`
  },
  {
    nome: "RetCodUsr",
    categoria: "Ambiente e Sessão",
    sintaxe: "RetCodUsr()",
    retorno: "Caractere (String de 6 dígitos com o ID interno do usuário)",
    descricaoCurta: "Retorna o código interno de identificação do usuário Protheus atualmente logado na sessão.",
    descricaoDetalhada: "Obtém o identificador numérico/alfanumérico interno de 6 caracteres correspondente ao usuário logado no Protheus (ex: '000000' para Administrador). Frequentemente utilizado para gravar logs de auditoria, rastrear o criador do registro ou consultar permissões no SIGAPSS.",
    parametros: [],
    exemplo: `// Exemplo prático: Gravação de log de auditoria com ID do usuário logado
User Function ExRetCodUsr()
    Local cCodUsr := RetCodUsr()
    Local cNomeUsr := UsrRetName(cCodUsr)

    ConOut("Usuário autenticado: " + cNomeUsr + " (Código ID: " + cCodUsr + ")")

    If cCodUsr == "000000"
        ConOut("Atenção: Acesso efetuado pelo superadministrador.")
    EndIf
Return`
  },
  {
    nome: "UsrRetName",
    categoria: "Ambiente e Sessão",
    sintaxe: "UsrRetName( <cCodUser> )",
    retorno: "Caractere (Nome completo cadastrado no Configurador)",
    descricaoCurta: "Retorna o nome completo cadastrado no módulo Configurador para o código de usuário informado.",
    descricaoDetalhada: "Busca no repositório de segurança do Protheus (SIGAPSS) a descrição e o nome completo vinculado ao código interno de 6 posições de um usuário (obtido via RetCodUsr). Retorna string vazia caso o código não seja localizado.",
    parametros: [
      { nome: "cCodUser", tipo: "Caractere", descricao: "Código de 6 caracteres do usuário no Protheus.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Obter nome do operador para exibição em cabeçalho
User Function ExUsrRetName()
    Local cIdOperador := RetCodUsr()
    Local cNomeCompleto := UsrRetName(cIdOperador)

    MsgInfo("Bem-vindo ao sistema, " + AllTrim(cNomeCompleto) + "!", "Acesso ao Sistema")
Return`
  },
  {
    nome: "UsrRetMail",
    categoria: "Ambiente e Sessão",
    sintaxe: "UsrRetMail( <cCodUser> )",
    retorno: "Caractere (E-mail do usuário ou string vazia)",
    descricaoCurta: "Retorna o endereço de e-mail cadastrado no módulo Configurador para o usuário especificado.",
    descricaoDetalhada: "Consulta o cadastro de usuários no Protheus e retorna o correio eletrônico cadastrado. Essencial para rotinas de envio automático de relatórios, workflows de aprovação e notificações internas de inconsistências.",
    parametros: [
      { nome: "cCodUser", tipo: "Caractere", descricao: "Código de 6 posições do usuário Protheus.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Notificação por e-mail para o usuário responsável
User Function ExUsrRetMail()
    Local cUser := RetCodUsr()
    Local cEmail := UsrRetMail(cUser)

    If !Empty(cEmail)
        ConOut("Enviando aviso de conclusão para: " + cEmail)
    Else
        ConOut("O usuário " + UsrRetName(cUser) + " não possui e-mail cadastrado.")
    EndIf
Return`
  },
  {
    nome: "PswAdmin",
    categoria: "Ambiente e Sessão",
    sintaxe: "PswAdmin( [<cCodUser>] )",
    retorno: "Lógico (.T. se for administrador, .F. caso contrário)",
    descricaoCurta: "Verifica se o usuário atual ou o código informado possui privilégios de administrador no Protheus.",
    descricaoDetalhada: "Avalia se o usuário corrente da sessão possui papel/perfil de Administrador do sistema no Protheus. Se omitido o parâmetro, avalia o usuário logado na thread atual.",
    parametros: [
      { nome: "cCodUser", tipo: "Caractere", descricao: "Código do usuário a testar (padrão: usuário corrente logado).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Controle de permissão para rotina crítica
User Function ExPswAdmin()
    If !PswAdmin()
        MsgAlert("Acesso negado! Esta rotina exige privilégios de Administrador do Protheus.", "Segurança")
        Return .F.
    EndIf

    MsgInfo("Acesso concedido. Iniciando manutenção do sistema...", "Manutenção")
Return .T.`
  },
  {
    nome: "GetEnvServer",
    categoria: "Ambiente e Sessão",
    sintaxe: "GetEnvServer()",
    retorno: "Caractere (Nome da seção de ambiente no appserver.ini)",
    descricaoCurta: "Retorna o nome do ambiente (Environment) do servidor Protheus no qual a thread atual está conectada.",
    descricaoDetalhada: "Identifica a seção do arquivo de configuração appserver.ini utilizada na conexão atual (ex: 'PRODUCAO', 'HOMOLOGACAO', 'TESTE'). Fundamental para validações de segurança e direcionamento de rotinas em ambientes não produtivos.",
    parametros: [],
    exemplo: `// Exemplo prático: Impedir execução de testes em ambiente de produção
User Function ExGetEnvServer()
    Local cEnv := Upper(AllTrim(GetEnvServer()))

    If "PROD" $ cEnv
        MsgAlert("Atenção: A rotina de simulação de carga não pode rodar em PRODUÇÃO (" + cEnv + ")!", "Bloqueio")
        Return .F.
    EndIf

    ConOut("Executando em ambiente seguro de testes: " + cEnv)
Return .T.`
  },
  {
    nome: "GetServerIP",
    categoria: "Ambiente e Sessão",
    sintaxe: "GetServerIP()",
    retorno: "Caractere (Endereço IP do servidor de aplicação)",
    descricaoCurta: "Retorna o endereço IP da máquina servidora onde o Protheus AppServer está em execução.",
    descricaoDetalhada: "Obtém o endereço IPv4 ou hostname da máquina servidora responsável pelo processamento da thread atual. Útil para logs de auditoria em infraestruturas com balanceamento de carga (Load Balancer / Broker) e múltiplos slaves.",
    parametros: [],
    exemplo: `// Exemplo prático: Identificação do servidor de processamento em cluster
User Function ExGetServerIP()
    Local cServerIP := GetServerIP()
    Local cAmbiente := GetEnvServer()

    ConOut("[AUDITORIA] Processado no AppServer IP: " + cServerIP + " | Ambiente: " + cAmbiente)
Return`
  },
  {
    nome: "GetClientIP",
    categoria: "Ambiente e Sessão",
    sintaxe: "GetClientIP()",
    retorno: "Caractere (Endereço IP da estação cliente)",
    descricaoCurta: "Retorna o endereço IP da estação de trabalho cliente (SmartClient ou navegador) conectada à sessão.",
    descricaoDetalhada: "Informa o endereço de rede do terminal onde o operador está interagindo com o SmartClient desktop ou SmartClient HTML/WebApp. Utilizado em logs de auditoria e controle de acesso por faixa de IPs permitidos.",
    parametros: [],
    exemplo: `// Exemplo prático: Registro de log de auditoria com IP do operador
User Function ExGetClientIP()
    Local cTerminalIP := GetClientIP()
    Local cUsuario    := UsrRetName(RetCodUsr())

    ConOut("Operação realizada por " + cUsuario + " a partir da estação IP: " + cTerminalIP)
Return`
  },
  {
    nome: "ProcName",
    categoria: "Ambiente e Sessão",
    sintaxe: "ProcName( [<nNivel>] )",
    retorno: "Caractere (Nome da função ou método em execução)",
    descricaoCurta: "Retorna o nome da rotina, função ou método em execução na pilha de chamadas (call stack).",
    descricaoDetalhada: "Inspeção da pilha de execução de programas. Nível 0 indica a rotina atual, 1 a rotina chamadora, 2 o chamador do nível anterior, e assim sucessivamente. Indispensável para rotinas genéricas de tratamento de erro e rastreamento de chamadas dinâmicas.",
    parametros: [
      { nome: "nNivel", tipo: "Numérico", descricao: "Nível na pilha de chamadas (0 = rotina corrente, 1 = chamadora). Padrão: 0.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Rastreamento dinâmico de origem de chamada
User Function MinhaRotina()
    U_GravaLogOrigem()
Return

User Function GravaLogOrigem()
    Local cRotinaAtual := ProcName(0) // GRAVALOGORIGEM
    Local cQuemChamou  := ProcName(1) // MINHAROTINA
    Local nLinhaOrigem := ProcLine(1)

    ConOut("Rotina [" + cRotinaAtual + "] acionada por [" + cQuemChamou + "] na linha " + cValToChar(nLinhaOrigem))
Return`
  },
  {
    nome: "ProcLine",
    categoria: "Ambiente e Sessão",
    sintaxe: "ProcLine( [<nNivel>] )",
    retorno: "Numérico (Número da linha no código fonte)",
    descricaoCurta: "Retorna o número da linha de código fonte em execução na pilha de chamadas para o nível informado.",
    descricaoDetalhada: "Trabalha em conjunto com ProcName() para detalhar a localização exata no arquivo fonte durante logs de auditoria, erros de execução ou funções de rastreamento customizadas.",
    parametros: [
      { nome: "nNivel", tipo: "Numérico", descricao: "Nível na pilha de chamadas (0 = linha corrente, 1 = chamadora). Padrão: 0.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Identificação de linha para registro de ocorrência
User Function ExProcLine()
    Local nLinha := ProcLine()
    Local cFuncao := ProcName()

    ConOut("Ponto de controle atingido em " + cFuncao + " linha: " + Str(nLinha, 4))
Return`
  },
  {
    nome: "VarInfo",
    categoria: "Ambiente e Sessão",
    sintaxe: "VarInfo( <cTitulo>, <xVariavel> )",
    retorno: "Caractere (String formatada com tipo, tamanho e conteúdo detalhado)",
    descricaoCurta: "Gera e exibe no console do servidor uma representação detalhada e recursiva do conteúdo de variáveis e objetos.",
    descricaoDetalhada: "Função de depuração (debug) que imprime no console do AppServer a estrutura interna completa de uma variável, percorrendo recursivamente arrays multidimensionais e propriedades de objetos de classes ADVPL.",
    parametros: [
      { nome: "cTitulo", tipo: "Caractere", descricao: "Título ou identificador descritivo exibido no cabeçalho da inspeção.", opcional: false },
      { nome: "xVariavel", tipo: "Qualquer", descricao: "Variável cujo conteúdo estruturado será inspecionado (Array, Objeto, String, etc.).", opcional: false }
    ],
    exemplo: `// Exemplo prático: Inspeção detalhada de array multidimensional no console
User Function ExVarInfo()
    Local aDados := {}

    AAdd(aDados, {"Cliente 1", 1500.50, .T.})
    AAdd(aDados, {"Cliente 2", 820.00, .F.})

    // Imprime estrutura completa no console.log do servidor
    VarInfo("Depuração do Vetor aDados", aDados)
Return`
  }
);
