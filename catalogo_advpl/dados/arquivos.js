/**
 * Catalogo de Funcoes ADVPL - Modulo Arquivos e Diretorios
 * Funcoes essenciais para criacao, leitura, gravacao e manipulacao de arquivos no servidor e estacao
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "File",
    categoria: "Arquivos e Diretórios",
    sintaxe: "File( <cArquivo> )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se um determinado arquivo existe no sistema de arquivos ou diretório especificado.",
    descricaoDetalhada: "Pesquisa a existência de um arquivo no disco local ou nos caminhos mapeados pelo RootPath do servidor Protheus. Retorna .T. se localizado ou .F. caso contrário.",
    parametros: [
      { nome: "cArquivo", tipo: "Caractere", descricao: "Nome ou caminho relativo/absoluto do arquivo a verificar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação de existência de arquivo antes de processar
User Function ExFile()
    Local cCaminho := "\\system\\sigamat.emp"

    If File(cCaminho)
        ConOut("Arquivo localizado no servidor: " + cCaminho)
    Else
        ConOut("Arquivo não encontrado!")
    EndIf
Return`
  },
  {
    nome: "FCreate",
    categoria: "Arquivos e Diretórios",
    sintaxe: "FCreate( <cArquivo>, [<nAtributo>] )",
    retorno: "Numérico (Handle do arquivo ou -1 se falha)",
    descricaoCurta: "Cria um novo arquivo em disco e retorna seu manipulador (handle) binário para escrita.",
    descricaoDetalhada: "Cria um novo arquivo binário em disco. Se o arquivo já existir, seu conteúdo será truncado para zero bytes. Retorna o handle numérico para operações com FWrite ou -1 em caso de erro.",
    parametros: [
      { nome: "cArquivo", tipo: "Caractere", descricao: "Nome e caminho do arquivo a ser criado.", opcional: false },
      { nome: "nAtributo", tipo: "Numérico", descricao: "Atributos do arquivo (0: Normal, 1: Somente Leitura, 2: Oculto, 4: Sistema). Padrão: 0.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação de arquivo de log
User Function ExFCreate()
    Local cPath := "\\spool\\log_integracao.txt"
    Local nHdl  := FCreate(cPath)

    If nHdl != -1
        FWrite(nHdl, "INICIO DO PROCESSAMENTO: " + Time() + CRLF)
        FClose(nHdl)
        ConOut("Arquivo criado com sucesso. Handle: " + cValToChar(nHdl))
    Else
        ConOut("Erro ao criar arquivo. Código FError: " + cValToChar(FError()))
    EndIf
Return`
  },
  {
    nome: "FOpen",
    categoria: "Arquivos e Diretórios",
    sintaxe: "FOpen( <cArquivo>, [<nModo>] )",
    retorno: "Numérico (Handle do arquivo ou -1 se falha)",
    descricaoCurta: "Abre um arquivo existente em disco e retorna seu identificador (handle) para leitura/escrita.",
    descricaoDetalhada: "Abre um arquivo existente permitindo especificar o modo de acesso (leitura, escrita ou ambos) e modo de compartilhamento. Retorna o identificador numérico (handle) ou -1 se falhar.",
    parametros: [
      { nome: "cArquivo", tipo: "Caractere", descricao: "Caminho do arquivo a ser aberto.", opcional: false },
      { nome: "nModo", tipo: "Numérico", descricao: "Modo de acesso (0: FO_READ, 1: FO_WRITE, 2: FO_READWRITE). Padrão: 0.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Abertura de arquivo de configuração em modo leitura
User Function ExFOpen()
    Local cFile := "\\system\\appserver.ini"
    Local nHdl  := FOpen(cFile, 0) // 0 = Apenas Leitura

    If nHdl != -1
        ConOut("Arquivo aberto com sucesso. Handle: " + cValToChar(nHdl))
        FClose(nHdl)
    Else
        ConOut("Falha na abertura do arquivo. FError: " + cValToChar(FError()))
    EndIf
Return`
  },
  {
    nome: "FRead",
    categoria: "Arquivos e Diretórios",
    sintaxe: "FRead( <nHandle>, @<cBuffer>, <nBytes> )",
    retorno: "Numérico (Quantidade de bytes lidos com sucesso)",
    descricaoCurta: "Lê uma quantidade de bytes de um arquivo aberto diretamente para uma variável de buffer.",
    descricaoDetalhada: "Lê <nBytes> a partir da posição atual do ponteiro do arquivo. A variável <cBuffer> deve ser previamente inicializada com tamanho suficiente (ex: Space(nBytes)) e passada por referência com @.",
    parametros: [
      { nome: "nHandle", tipo: "Numérico", descricao: "Handle do arquivo retornado por FOpen ou FCreate.", opcional: false },
      { nome: "cBuffer", tipo: "Caractere", descricao: "Variável passada por referência (@) que receberá os dados lidos.", opcional: false },
      { nome: "nBytes", tipo: "Numérico", descricao: "Quantidade de bytes a ler do arquivo.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Leitura de cabeçalho de arquivo
User Function ExFRead()
    Local nHdl    := FOpen("\\spool\\dados.txt", 0)
    Local cBuffer := Space(100)
    Local nLidos  := 0

    If nHdl != -1
        nLidos := FRead(nHdl, @cBuffer, 100)
        ConOut("Bytes lidos: " + cValToChar(nLidos))
        ConOut("Conteúdo lido: " + cBuffer)
        FClose(nHdl)
    EndIf
Return`
  },
  {
    nome: "FWrite",
    categoria: "Arquivos e Diretórios",
    sintaxe: "FWrite( <nHandle>, <cBuffer>, [<nBytes>] )",
    retorno: "Numérico (Quantidade de bytes gravados)",
    descricaoCurta: "Grava uma cadeia de caracteres ou buffer de dados em um arquivo previamente aberto.",
    descricaoDetalhada: "Escreve o conteúdo de <cBuffer> no arquivo a partir da posição corrente do ponteiro. Retorna a quantidade de bytes gravados com sucesso. Se retornar número menor que o comprimento de bytes, indica erro ou disco cheio.",
    parametros: [
      { nome: "nHandle", tipo: "Numérico", descricao: "Handle do arquivo retornado por FCreate ou FOpen.", opcional: false },
      { nome: "cBuffer", tipo: "Caractere", descricao: "Cadeia de caracteres a ser gravada no arquivo.", opcional: false },
      { nome: "nBytes", tipo: "Numérico", descricao: "Quantidade de bytes a gravar. Se omitido, grava toda a string cBuffer.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Gravação de linhas em arquivo CSV
User Function ExFWrite()
    Local nHdl := FCreate("\\spool\\resultado.csv")

    If nHdl != -1
        FWrite(nHdl, "CODIGO;DESCRICAO;VALOR" + CRLF)
        FWrite(nHdl, "001;PRODUTO A;100.00" + CRLF)
        FClose(nHdl)
        ConOut("Dados gravados com sucesso no CSV!")
    EndIf
Return`
  },
  {
    nome: "FClose",
    categoria: "Arquivos e Diretórios",
    sintaxe: "FClose( <nHandle> )",
    retorno: "Lógico (.T. se sucesso, .F. se falha)",
    descricaoCurta: "Fecha um arquivo aberto por FCreate ou FOpen liberando o descritor e salvando os buffers em disco.",
    descricaoDetalhada: "Fecha o arquivo associado ao handle informado, descarregando todos os buffers pendentes para o disco e liberando o descritor de arquivo para o sistema operacional.",
    parametros: [
      { nome: "nHandle", tipo: "Numérico", descricao: "Identificador (handle) do arquivo a ser fechado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Fechamento seguro de arquivo
User Function ExFClose()
    Local nHdl := FCreate("\\spool\\teste.txt")
    If nHdl != -1
        FWrite(nHdl, "Linha gravada com sucesso")
        If FClose(nHdl)
            ConOut("Arquivo fechado e salvo com sucesso.")
        EndIf
    EndIf
Return`
  },
  {
    nome: "FErase",
    categoria: "Arquivos e Diretórios",
    sintaxe: "FErase( <cArquivo> )",
    retorno: "Numérico (0 se sucesso ou -1 se falha)",
    descricaoCurta: "Exclui fisicamente um arquivo do sistema de arquivos.",
    descricaoDetalhada: "Remove o arquivo especificado do disco. O arquivo não pode estar em uso por nenhum outro processo. Retorna 0 se o arquivo for apagado com sucesso ou -1 em caso de erro.",
    parametros: [
      { nome: "cArquivo", tipo: "Caractere", descricao: "Caminho do arquivo a ser excluído.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Exclusão de arquivo temporário
User Function ExFErase()
    Local cArqTemp := "\\spool\\temp_relat.tmp"

    If File(cArqTemp)
        If FErase(cArqTemp) == 0
            ConOut("Arquivo temporário excluído com sucesso.")
        Else
            ConOut("Erro ao excluir arquivo. FError: " + cValToChar(FError()))
        EndIf
    EndIf
Return`
  },
  {
    nome: "FRename",
    categoria: "Arquivos e Diretórios",
    sintaxe: "FRename( <cOrigem>, <cDestino> )",
    retorno: "Numérico (0 se sucesso ou -1 se erro)",
    descricaoCurta: "Renomeia ou move um arquivo em disco de um caminho de origem para um novo destino.",
    descricaoDetalhada: "Altera o nome de um arquivo no disco ou o move de diretório. O arquivo de origem deve existir e o arquivo de destino não pode existir previamente. Retorna 0 se bem-sucedido.",
    parametros: [
      { nome: "cOrigem", tipo: "Caractere", descricao: "Caminho e nome atual do arquivo.", opcional: false },
      { nome: "cDestino", tipo: "Caractere", descricao: "Novo caminho e nome desejado para o arquivo.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Renomeação de arquivo após término da gravação
User Function ExFRename()
    Local cVelho := "\\spool\\pedidos.tmp"
    Local cNovo  := "\\spool\\pedidos.csv"

    If FRename(cVelho, cNovo) == 0
        ConOut("Arquivo renomeado com sucesso!")
    Else
        ConOut("Erro ao renomear arquivo: " + cValToChar(FError()))
    EndIf
Return`
  },
  {
    nome: "Directory",
    categoria: "Arquivos e Diretórios",
    sintaxe: "Directory( [<cMascara>], [<cAtributos>] )",
    retorno: "Array (Matriz bidimensional com dados dos arquivos)",
    descricaoCurta: "Retorna uma matriz contendo informações detalhadas dos arquivos e subpastas que atendem a um filtro.",
    descricaoDetalhada: "Lista os arquivos de um diretório. Cada linha da matriz retornada contém: [1] Nome (C), [2] Tamanho em bytes (N), [3] Data da última alteração (D), [4] Hora da alteração (C) e [5] Atributos (C).",
    parametros: [
      { nome: "cMascara", tipo: "Caractere", descricao: "Filtro de busca com curingas (ex: '\\spool\\*.csv'). Padrão: '*.*'.", opcional: true },
      { nome: "cAtributos", tipo: "Caractere", descricao: "Atributos a incluir na listagem ('D' para pastas, 'H' para ocultos, 'S' para sistema).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Listagem de todos os arquivos de um diretório
User Function ExDirectory()
    Local aArquivos := Directory("\\spool\\*.csv")
    Local nI        := 0

    ConOut("Total de arquivos CSV encontrados: " + cValToChar(Len(aArquivos)))
    For nI := 1 To Len(aArquivos)
        ConOut("Arquivo: " + aArquivos[nI][1] + " | Tamanho: " + cValToChar(aArquivos[nI][2]) + " bytes")
    Next nI
Return`
  },
  {
    nome: "MemoRead",
    categoria: "Arquivos e Diretórios",
    sintaxe: "MemoRead( <cArquivo> )",
    retorno: "Caractere (String com todo o conteúdo do arquivo)",
    descricaoCurta: "Lê e carrega diretamente todo o conteúdo de um arquivo de texto em disco para a memória.",
    descricaoDetalhada: "Abre o arquivo informado, lê todo o seu conteúdo para uma string de texto na memória e o fecha automaticamente. Ideal para carregar arquivos de configuração, scripts SQL, templates, XML e JSON.",
    parametros: [
      { nome: "cArquivo", tipo: "Caractere", descricao: "Nome e caminho do arquivo de texto a ser lido.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Leitura integral de script SQL
User Function ExMemoRead()
    Local cArquivo  := "\\system\\query_clientes.sql"
    Local cConteudo := ""

    If File(cArquivo)
        cConteudo := MemoRead(cArquivo)
        ConOut("Script SQL carregado com sucesso (" + cValToChar(Len(cConteudo)) + " caracteres).")
    EndIf
Return`
  },
  {
    nome: "MemoWrite",
    categoria: "Arquivos e Diretórios",
    sintaxe: "MemoWrite( <cArquivo>, <cString> )",
    retorno: "Lógico (.T. se gravado com sucesso, .F. se falha)",
    descricaoCurta: "Grava diretamente uma cadeia de caracteres inteira da memória para um arquivo em disco.",
    descricaoDetalhada: "Cria um arquivo em disco (ou sobrescreve o existente) e grava toda a string de texto passada no segundo parâmetro. Retorna .T. se a gravação for concluída com êxito.",
    parametros: [
      { nome: "cArquivo", tipo: "Caractere", descricao: "Caminho do arquivo a ser criado ou sobrescrito.", opcional: false },
      { nome: "cString", tipo: "Caractere", descricao: "Conteúdo textual a ser gravado no arquivo.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Geração rápida de arquivo de log
User Function ExMemoWrite()
    Local cDestino := "\\spool\\relatorio_rapido.txt"
    Local cRelat   := "RELATÓRIO GERADO EM " + dToC(Date()) + " AS " + Time() + CRLF

    cRelat += "Linha 1: Faturamento Mensal OK" + CRLF
    cRelat += "Linha 2: Estoques Atualizados" + CRLF

    If MemoWrite(cDestino, cRelat)
        ConOut("Arquivo gravado com sucesso via MemoWrite!")
    EndIf
Return`
  },
  {
    nome: "CpyT2S",
    categoria: "Arquivos e Diretórios",
    sintaxe: "CpyT2S( <cOrigemClient>, <cDestinoServer>, [<lShowProgress>] )",
    retorno: "Numérico (0 se sucesso)",
    descricaoCurta: "Copia um arquivo da máquina do usuário (Client / SmartClient) para o servidor Protheus (Server).",
    descricaoDetalhada: "Transfere um arquivo físico da estação de trabalho cliente para o ambiente do servidor Protheus. Essencial em rotinas de importação de planilhas, arquivos bancários e notas fiscais selecionadas pelo operador.",
    parametros: [
      { nome: "cOrigemClient", tipo: "Caractere", descricao: "Caminho completo do arquivo na máquina do usuário (ex: 'C:\\temp\\planilha.xlsx').", opcional: false },
      { nome: "cDestinoServer", tipo: "Caractere", descricao: "Caminho de destino no servidor Protheus (ex: '\\spool\\import.xlsx').", opcional: false },
      { nome: "lShowProgress", tipo: "Lógico", descricao: "Exibe régua visual de progresso da transferência (padrão: .T.).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Transferência de arquivo da estação para o servidor
User Function ExCpyT2S()
    Local cArqLocal  := "C:\\temp\\planilha_precos.xlsx"
    Local cArqServer := "\\spool\\import_precos.xlsx"
    Local nRet       := 0

    // Copia da estação de trabalho para o servidor
    nRet := CpyT2S(cArqLocal, cArqServer, .T.)

    If nRet == 0
        ConOut("Arquivo transferido com sucesso para o servidor: " + cArqServer)
    Else
        ConOut("Falha na cópia do arquivo do cliente para o servidor!")
    EndIf
Return`
  },
  {
    nome: "CpyS2T",
    categoria: "Arquivos e Diretórios",
    sintaxe: "CpyS2T( <cOrigemServer>, <cDestinoClient>, [<lShowProgress>] )",
    retorno: "Numérico (0 se sucesso)",
    descricaoCurta: "Copia um arquivo do servidor Protheus (Server) para a máquina do usuário (Client / SmartClient).",
    descricaoDetalhada: "Inverso de CpyT2S(). Sigla para 'Copy Server to Terminal'. Essencial para download de relatórios em Excel, PDFs e arquivos exportados para a máquina do usuário.",
    parametros: [
      { nome: "cOrigemServer", tipo: "Caractere", descricao: "Caminho do arquivo no servidor.", opcional: false },
      { nome: "cDestinoClient", tipo: "Caractere", descricao: "Caminho de destino na máquina do operador.", opcional: false },
      { nome: "lShowProgress", tipo: "Lógico", descricao: "Exibe régua de progresso (padrão: .T.).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Download de arquivo do servidor para a estação local
User Function ExCpyS2T()
    Local cServer := "\\spool\\relatorio_geral.pdf"
    Local cLocal  := "C:\\temp\\relatorio_geral.pdf"

    If CpyS2T(cServer, cLocal, .T.) == 0
        ConOut("Arquivo transferido com sucesso para a estação do usuário!")
    EndIf
Return`
  },
  {
    nome: "MakeDir",
    categoria: "Arquivos e Diretórios",
    sintaxe: "MakeDir( <cDiretorio> )",
    retorno: "Numérico (0 se sucesso ou -1 se falha)",
    descricaoCurta: "Cria uma nova pasta ou diretório no sistema de arquivos do servidor Protheus.",
    descricaoDetalhada: "Cria a pasta especificada a partir do RootPath ou no caminho indicado. Retorna 0 se criada com êxito.",
    parametros: [
      { nome: "cDiretorio", tipo: "Caractere", descricao: "Caminho da pasta a ser criada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Criação de diretório no servidor
User Function ExMakeDir()
    Local cNovaPasta := "\\spool\\nfe_processadas"

    If !ExistDir(cNovaPasta)
        If MakeDir(cNovaPasta) == 0
            ConOut("Pasta criada com sucesso!")
        EndIf
    EndIf
Return`
  },
  {
    nome: "ExistDir",
    categoria: "Arquivos e Diretórios",
    sintaxe: "ExistDir( <cDiretorio> )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se um determinado diretório ou pasta existe no servidor.",
    descricaoDetalhada: "Retorna .T. se a pasta informada existir no disco e for um diretório válido; .F. caso contrário.",
    parametros: [
      { nome: "cDiretorio", tipo: "Caractere", descricao: "Caminho do diretório a testar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação de diretório
User Function ExExistDir()
    Local cPasta := "\\system"

    If ExistDir(cPasta)
        ConOut("Diretório de sistema confirmado no servidor.")
    EndIf
Return`
  }
);
