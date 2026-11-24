/**
 * Catalogo de Funcoes ADVPL - Modulo Integracoes, Web Services, JSON, XML e Rotinas Automaticas
 * Funcoes essenciais para consumo de APIs REST/SOAP, parse de XML/JSON, codificacao UTF-8 e ExecAuto
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "XmlParser",
    categoria: "Integra��es e Web",
    sintaxe: "XmlParser( <cXml>, <cIdent>, @<cError>, @<cWarning> )",
    retorno: "Objeto (Inst�ncia do objeto DOM do XML parseado)",
    descricaoCurta: "Realiza o parse completo de uma string XML gerando um objeto com estrutura de propriedades naveg�veis.",
    descricaoDetalhada: "Fun��o nativa do ADVPL para leitura e interpreta��o de XMLs de NF-e, CT-e, MDF-e e Web Services SOAP. Gera um objeto com n�s acess�veis via operadores de propriedade (ex: oXml:_NFE:_INFNFE:_IDE:_NNF:TEXT).",
    parametros: [
      { nome: "cXml", tipo: "Caractere", descricao: "String contendo o XML a ser interpretado.", opcional: false },
      { nome: "cIdent", tipo: "Caractere", descricao: "Prefixo identificador para n�s internos (usualmente '_').", opcional: false },
      { nome: "cError", tipo: "Caractere", descricao: "Vari�vel por refer�ncia que receber� mensagens de erro de parse.", opcional: false },
      { nome: "cWarning", tipo: "Caractere", descricao: "Vari�vel por refer�ncia que receber� mensagens de aviso.", opcional: false }
    ],
    exemplo: `// Exemplo pr�tico: Leitura de dados de XML
User Function ExXmlParser()
    Local cXml     := "<pedido><numero>1020</numero><valor>150.00</valor></pedido>"
    Local cError   := ""
    Local cWarning := ""
    Local oXml     := XmlParser(cXml, "_", @cError, @cWarning)

    If oXml != NIL
        ConOut("N�mero do pedido: " + oXml:_PEDIDO:_NUMERO:TEXT)
        ConOut("Valor total: " + oXml:_PEDIDO:_VALOR:TEXT)
    Else
        ConOut("Erro no parse do XML: " + cError)
    EndIf
Return`
  },
  {
    nome: "XmlChildEx",
    categoria: "Integra��es e Web",
    sintaxe: "XmlChildEx( <oNode>, <cNomeFilho> )",
    retorno: "Objeto (N� filho) ou NIL",
    descricaoCurta: "Busca e retorna um n� filho espec�fico dentro de uma estrutura de objeto XML gerada por XmlParser.",
    descricaoDetalhada: "Permite verificar se um determinado n� filho existe antes de tentar acess�-lo diretamente, evitando erros de execu��o por acesso a propriedade inexistente.",
    parametros: [
      { nome: "oNode", tipo: "Objeto", descricao: "Objeto do n� pai no XML.", opcional: false },
      { nome: "cNomeFilho", tipo: "Caractere", descricao: "Nome da tag filha a procurar (incluindo prefixo de identificador).", opcional: false }
    ],
    exemplo: `// Exemplo pr�tico: Verifica��o segura de tag opcional no XML
User Function ExXmlChildEx()
    Local oNodeFilho := XmlChildEx(oXml:_PEDIDO, "_OBSERVACOES")

    If oNodeFilho != NIL
        ConOut("Observa��es: " + oNodeFilho:TEXT)
    Else
        ConOut("Tag de observa��es n�o presente no XML.")
    EndIf
Return`
  },
  {
    nome: "EncodeUTF8",
    categoria: "Integra��es e Web",
    sintaxe: "EncodeUTF8( <cStringAnsi> )",
    retorno: "Caractere (String codificada em UTF-8)",
    descricaoCurta: "Converte uma cadeia de caracteres do padr�o ANSI (Windows-1252) para a codifica��o UTF-8.",
    descricaoDetalhada: "Essencial na gera��o de payloads JSON, XMLs de documentos fiscais eletr�nicos e integra��o com APIs REST para preservar caracteres acentuados sem corrup��o.",
    parametros: [
      { nome: "cStringAnsi", tipo: "Caractere", descricao: "Texto na codifica��o local do Protheus.", opcional: false }
    ],
    exemplo: `// Exemplo pr�tico: Codifica��o de texto para payload JSON
User Function ExEncodeUTF8()
    Local cTextoAnsi := "Relat�rio de Opera��o de Produ��o"
    Local cTextoUTF8 := EncodeUTF8(cTextoAnsi)

    ConOut("Texto codificado para UTF-8 com sucesso.")
Return`
  },
  {
    nome: "DecodeUTF8",
    categoria: "Integra��es e Web",
    sintaxe: "DecodeUTF8( <cStringUTF8> )",
    retorno: "Caractere (String decodificada em ANSI/Windows-1252)",
    descricaoCurta: "Converte uma cadeia de caracteres no formato UTF-8 para o padr�o local ANSI do Protheus.",
    descricaoDetalhada: "Inverso de EncodeUTF8(). Utilizada ao receber dados de requisi��es REST externas, web services e arquivos JSON codificados em UTF-8, garantindo grava��o correta nos campos do banco de dados.",
    parametros: [
      { nome: "cStringUTF8", tipo: "Caractere", descricao: "Texto em formato UTF-8.", opcional: false }
    ],
    exemplo: `// Exemplo pr�tico: Decodifica��o de resposta de API REST
User Function ExDecodeUTF8()
    Local cRecebidoAPI := "São Paulo" // UTF-8 lido de endpoint
    Local cConvertido  := DecodeUTF8(cRecebidoAPI)

    ConOut("Texto decodificado: " + cConvertido) // "S�o Paulo"
Return`
  },
  {
    nome: "Escape",
    categoria: "Integra��es e Web",
    sintaxe: "Escape( <cString> )",
    retorno: "Caractere (String com caracteres codificados para URL/Percent-encoding)",
    descricaoCurta: "Codifica caracteres especiais em formato URL-encoded (%20, %2F, etc.) para uso em query strings.",
    descricaoDetalhada: "Converte espa�os, caracteres especiais e pontua��es para sua nota��o hexadecimal compat�vel com par�metros de URLs HTTP.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Texto a ser codificado para URL.", opcional: false }
    ],
    exemplo: `// Exemplo pr�tico: Codifica��o de par�metros para URL de busca
User Function ExEscape()
    Local cBusca    := "PRODUTO TESTE & CIA"
    Local cUrlParam := Escape(cBusca)

    ConOut("URL Encoded: " + cUrlParam)
    // "PRODUTO%20TESTE%20%26%20CIA"
Return`
  },
  {
    nome: "HttpGet",
    categoria: "Integra��es e Web",
    sintaxe: "HttpGet( <cUrl>, [<cParams>], [<nTimeout>], [<aHeaders>], [@<cHeaderRet>] )",
    retorno: "Caractere (Corpo da resposta HTTP)",
    descricaoCurta: "Executa uma requisi��o HTTP do tipo GET para uma URL externa e retorna a resposta do servidor.",
    descricaoDetalhada: "Permite consultar APIs REST, servi�os de CEP, cota��es e web services via protocolo HTTP/HTTPS de forma s�ncrona.",
    parametros: [
      { nome: "cUrl", tipo: "Caractere", descricao: "Endere�o URL de destino.", opcional: false },
      { nome: "cParams", tipo: "Caractere", descricao: "Par�metros de consulta (query string).", opcional: true },
      { nome: "nTimeout", tipo: "Num�rico", descricao: "Tempo limite em segundos (padr�o: 30).", opcional: true },
      { nome: "aHeaders", tipo: "Array", descricao: "Vetor com cabe�alhos HTTP customizados.", opcional: true },
      { nome: "cHeaderRet", tipo: "Caractere", descricao: "Vari�vel por refer�ncia que receber� os cabe�alhos de resposta.", opcional: true }
    ],
    exemplo: `// Exemplo pr�tico: Consulta a servi�o de CEP via HTTP GET
User Function ExHttpGet()
    Local cUrl       := "https://viacep.com.br/ws/01001000/json/"
    Local aHeaders   := {"Content-Type: application/json"}
    Local cHeaderRet := ""
    Local cResposta  := HttpGet(cUrl, , 15, aHeaders, @cHeaderRet)

    ConOut("Resposta da API: " + cResposta)
Return`
  },
  {
    nome: "HttpPost",
    categoria: "Integra��es e Web",
    sintaxe: "HttpPost( <cUrl>, [<cParams>], <cPostData>, [<nTimeout>], [<aHeaders>], [@<cHeaderRet>] )",
    retorno: "Caractere (Corpo da resposta HTTP do servidor)",
    descricaoCurta: "Executa uma requisi��o HTTP do tipo POST enviando dados no corpo da mensagem.",
    descricaoDetalhada: "Fun��o nativa de envio de dados para APIs REST e web services externos. Suporta envio de payloads JSON, XML e formul�rios com cabe�alhos customizados.",
    parametros: [
      { nome: "cUrl", tipo: "Caractere", descricao: "URL do endpoint de destino.", opcional: false },
      { nome: "cParams", tipo: "Caractere", descricao: "Par�metros adicionais de URL.", opcional: true },
      { nome: "cPostData", tipo: "Caractere", descricao: "Conte�do textual enviado no corpo (Body) da requisi��o.", opcional: false },
      { nome: "nTimeout", tipo: "Num�rico", descricao: "Tempo limite em segundos (padr�o: 30).", opcional: true },
      { nome: "aHeaders", tipo: "Array", descricao: "Cabe�alhos HTTP adicionais (ex: Authorization).", opcional: true },
      { nome: "cHeaderRet", tipo: "Caractere", descricao: "Vari�vel por refer�ncia que receber� os cabe�alhos de retorno.", opcional: true }
    ],
    exemplo: `// Exemplo pr�tico: Envio de pedido via API REST com HTTP POST
User Function ExHttpPost()
    Local cUrl       := "https://api.empresa.com.br/v1/pedidos"
    Local cBody      := '{"cliente": "000001", "total": 250.00}'
    Local aHeaders   := {"Content-Type: application/json", "Authorization: Bearer TOKEN123"}
    Local cHeaderRet := ""
    Local cRetorno   := HttpPost(cUrl, , cBody, 30, aHeaders, @cHeaderRet)

    ConOut("Resposta do envio: " + cRetorno)
Return`
  },
  {
    nome: "FWJsonSerialize",
    categoria: "Integra��es e Web",
    sintaxe: "FWJsonSerialize( <xObjeto>, [<lCompact>], [<lEscaped>] )",
    retorno: "Caractere (String JSON formatada)",
    descricaoCurta: "Serializa um objeto, array ou HashMap do ADVPL para uma cadeia de caracteres no formato JSON.",
    descricaoDetalhada: "Componente oficial moderno do Protheus para gera��o de JSON. Transforma estruturas de dados em texto JSON padronizado com alta performance, essencial para constru��o de endpoints REST.",
    parametros: [
      { nome: "xObjeto", tipo: "Objeto / Array / HashMap", descricao: "Estrutura de dados a serializar.", opcional: false },
      { nome: "lCompact", tipo: "L�gico", descricao: "Se .T., gera JSON compacto sem quebras de linha (padr�o: .T.).", opcional: true },
      { nome: "lEscaped", tipo: "L�gico", descricao: "Escapa caracteres especiais automaticamente (padr�o: .T.).", opcional: true }
    ],
    exemplo: `// Exemplo pr�tico: Gera��o de JSON a partir de objeto ADVPL
User Function ExFWJsonSerialize()
    Local oCliente := JsonObject():New()
    Local cJson    := ""

    oCliente["codigo"] := "000150"
    oCliente["nome"]   := "EMPRESA MODELO S.A."
    oCliente["limite"] := 50000.00

    cJson := FWJsonSerialize(oCliente)
    ConOut("JSON Gerado: " + cJson)
Return`
  },
  {
    nome: "FWJsonDeserialize",
    categoria: "Integra��es e Web",
    sintaxe: "FWJsonDeserialize( <cJson>, @<xObjeto> )",
    retorno: "L�gico (.T. se sucesso ou .F. se JSON inv�lido)",
    descricaoCurta: "Converte uma string JSON em um objeto ou estrutura de dados nativa do ADVPL.",
    descricaoDetalhada: "Realiza a decodifica��o de texto JSON diretamente para uma vari�vel de objeto ou array nativo, permitindo acesso imediato �s propriedades (ex: oObj['nome']).",
    parametros: [
      { nome: "cJson", tipo: "Caractere", descricao: "String de texto em formato JSON.", opcional: false },
      { nome: "xObjeto", tipo: "Qualquer tipo", descricao: "Vari�vel passada por refer�ncia (@) que receber� o objeto parseado.", opcional: false }
    ],
    exemplo: `// Exemplo pr�tico: Parse de string JSON para objeto
User Function ExFWJsonDeserialize()
    Local cPayload := '{"codigo": "0001", "status": "APROVADO"}'
    Local oDados   := NIL

    If FWJsonDeserialize(cPayload, @oDados)
        ConOut("C�digo: " + oDados["codigo"])
        ConOut("Status: " + oDados["status"])
    Else
        ConOut("Erro: JSON inv�lido ou malformado!")
    EndIf
Return`
  },
  {
    nome: "MsExecAuto",
    categoria: "Integra��es e Web",
    sintaxe: "MsExecAuto( <bRotina>, [<xParam1>], [<xParam2>], ... )",
    retorno: "NIL",
    descricaoCurta: "Executa uma rotina padr�o do Protheus em segundo plano de forma autom�tica (ExecAuto).",
    descricaoDetalhada: "A ferramenta primordial de integra��o nativa do Protheus. Executa rotinas padr�o de cadastro e movimentos (como inclus�o de pedidos MATA410, notas MATA461 e clientes MATA030) validando todas as regras de neg�cio, tabelas SX e integridade sem interface gr�fica.",
    parametros: [
      { nome: "bRotina", tipo: "Bloco de C�digo", descricao: "Bloco de c�digo que invoca a rotina padr�o (ex: {|x, y| MATA410(x, y)}).", opcional: false },
      { nome: "xParam1, xParam2...", tipo: "Qualquer tipo", descricao: "Par�metros esperados pela rotina (cabe�alho, itens, op��o 3: Inclus�o, 4: Altera��o, 5: Exclus�o).", opcional: true }
    ],
    exemplo: `// Exemplo pr�tico: Chamada de rotina autom�tica com controle de erro
User Function ExMsExecAuto()
    Private lMsErroAuto := .F.
    Private lMsHelpAuto := .T.
    Local aCabec        := {}
    Local aItens        := {}

    // Exemplo conceitual de inclus�o via ExecAuto
    // MsExecAuto({|x, y, z| MATA410(x, y, z)}, aCabec, aItens, 3)

    If lMsErroAuto
        ConOut("Erro na rotina autom�tica! Consulte MostraErro().")
    Else
        ConOut("Rotina autom�tica conclu�da com sucesso!")
    EndIf
Return`
  }
);
