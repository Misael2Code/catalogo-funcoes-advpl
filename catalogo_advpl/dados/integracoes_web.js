/**
 * Catalogo de Funcoes ADVPL - Modulo Integracoes, Web Services e Formatos
 * Funcoes essenciais para REST, SOAP, XML, JSON e integracao de sistemas
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "XmlParser",
    categoria: "Integrações e Web",
    sintaxe: "XmlParser( <cXml>, <cIdent>, @<cError>, @<cWarning> )",
    retorno: "Objeto (Instância do objeto DOM do XML parseado)",
    descricaoCurta: "Realiza o parse completo de uma string XML gerando um objeto com estrutura de propriedades navegáveis.",
    descricaoDetalhada: "Função nativa do ADVPL para leitura e interpretação de XMLs de NF-e, CT-e, MDF-e e Web Services SOAP. Gera um objeto com nós acessíveis via operadores de propriedade (ex: oXml:_NFE:_INFNFE:_IDE:_NNF:TEXT).",
    parametros: [
      { nome: "cXml", tipo: "Caractere", descricao: "String contendo o XML a ser interpretado.", opcional: false },
      { nome: "cIdent", tipo: "Caractere", descricao: "Prefixo identificador para nós internos (usualmente '_').", opcional: false },
      { nome: "cError", tipo: "Caractere", descricao: "Variável por referência que receberá mensagens de erro de parse.", opcional: false },
      { nome: "cWarning", tipo: "Caractere", descricao: "Variável por referência que receberá mensagens de aviso.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Leitura de dados de XML
User Function ExXmlParser()
Local cXml     := "<pedido><numero>1020</numero><valor>150.00</valor></pedido>"
Local cError   := ""
Local cWarning := ""
Local oXml     := XmlParser(cXml, "_", @cError, @cWarning)

If oXml != NIL
    ConOut("Número do pedido: " + oXml:_PEDIDO:_NUMERO:TEXT)
    ConOut("Valor total: " + oXml:_PEDIDO:_VALOR:TEXT)
Else
    ConOut("Erro no parse do XML: " + cError)
EndIf
Return`
  },
  {
    nome: "XmlChildEx",
    categoria: "Integrações e Web",
    sintaxe: "XmlChildEx( <oNode>, <cNomeFilho> )",
    retorno: "Objeto (Nó filho) ou NIL",
    descricaoCurta: "Busca e retorna um nó filho específico dentro de uma estrutura de objeto XML gerada por XmlParser.",
    descricaoDetalhada: "Permite verificar se um determinado nó filho existe antes de tentar acessá-lo diretamente, evitando erros de execução por acesso a propriedade inexistente.",
    parametros: [
      { nome: "oNode", tipo: "Objeto", descricao: "Objeto do nó pai no XML.", opcional: false },
      { nome: "cNomeFilho", tipo: "Caractere", descricao: "Nome da tag filha a procurar (incluindo prefixo de identificador).", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação segura de tag opcional no XML
User Function ExXmlChildEx()
Local oNodeFilho := XmlChildEx(oXml:_PEDIDO, "_OBSERVACOES")

If oNodeFilho != NIL
    ConOut("Observações: " + oNodeFilho:TEXT)
Else
    ConOut("Tag de observações não presente no XML.")
EndIf
Return`
  },
  {
    nome: "EncodeUTF8",
    categoria: "Integrações e Web",
    sintaxe: "EncodeUTF8( <cStringAnsi> )",
    retorno: "Caractere (String codificada em UTF-8)",
    descricaoCurta: "Converte uma cadeia de caracteres do padrão ANSI (Windows-1252) para a codificação UTF-8.",
    descricaoDetalhada: "Essencial na geração de payloads JSON, XMLs de documentos fiscais eletrônicos e integração com APIs REST para preservar caracteres acentuados sem corrupção.",
    parametros: [
      { nome: "cStringAnsi", tipo: "Caractere", descricao: "Texto na codificação local do Protheus.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Codificação de texto para payload JSON
User Function ExEncodeUTF8()
Local cTextoAnsi := "Relatório de Operação de Produção"
Local cTextoUTF8 := EncodeUTF8(cTextoAnsi)

ConOut("Texto codificado para UTF-8 com sucesso.")
Return`
  },
  {
    nome: "DecodeUTF8",
    categoria: "Integrações e Web",
    sintaxe: "DecodeUTF8( <cStringUTF8> )",
    retorno: "Caractere (String decodificada em ANSI/Windows-1252)",
    descricaoCurta: "Converte uma cadeia de caracteres no formato UTF-8 para o padrão local ANSI do Protheus.",
    descricaoDetalhada: "Inverso de EncodeUTF8(). Utilizada ao receber dados de requisições REST externas, web services e arquivos JSON codificados em UTF-8, garantindo gravação correta nos campos do banco de dados.",
    parametros: [
      { nome: "cStringUTF8", tipo: "Caractere", descricao: "Texto em formato UTF-8.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Decodificação de resposta de API REST
User Function ExDecodeUTF8()
Local cRecebidoAPI := "S" + Chr(195) + Chr(163) + "o Paulo" // Bytes UTF-8 recebidos
Local cConvertido  := DecodeUTF8(cRecebidoAPI)

ConOut("Texto decodificado: " + cConvertido) // "São Paulo"
Return`
  },
  {
    nome: "Escape",
    categoria: "Integrações e Web",
    sintaxe: "Escape( <cString> )",
    retorno: "Caractere (String com caracteres codificados para URL/Percent-encoding)",
    descricaoCurta: "Codifica caracteres especiais em formato URL-encoded (%20, %2F, etc.) para uso em query strings.",
    descricaoDetalhada: "Converte espaços, caracteres especiais e pontuações para sua notação hexadecimal compatível com parâmetros de URLs HTTP.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Texto a ser codificado para URL.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Codificação de parâmetros para URL de busca
User Function ExEscape()
Local cBusca    := "PRODUTO TESTE & CIA"
Local cUrlParam := Escape(cBusca)

ConOut("URL Encoded: " + cUrlParam)
// "PRODUTO%20TESTE%20%26%20CIA"
Return`
  },
  {
    nome: "HttpGet",
    categoria: "Integrações e Web",
    sintaxe: "HttpGet( <cUrl>, [<cParams>], [<nTimeout>], [<aHeaders>], [@<cHeaderRet>] )",
    retorno: "Caractere (Corpo da resposta HTTP)",
    descricaoCurta: "Executa uma requisição HTTP do tipo GET para uma URL externa e retorna a resposta do servidor.",
    descricaoDetalhada: "Permite consultar APIs REST, serviços de CEP, cotações e web services via protocolo HTTP/HTTPS de forma síncrona.",
    parametros: [
      { nome: "cUrl", tipo: "Caractere", descricao: "Endereço URL de destino.", opcional: false },
      { nome: "cParams", tipo: "Caractere", descricao: "Parâmetros de consulta (query string).", opcional: true },
      { nome: "nTimeout", tipo: "Numérico", descricao: "Tempo limite em segundos (padrão: 30).", opcional: true },
      { nome: "aHeaders", tipo: "Array", descricao: "Vetor com cabeçalhos HTTP customizados.", opcional: true },
      { nome: "cHeaderRet", tipo: "Caractere", descricao: "Variável por referência que receberá os cabeçalhos de resposta.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Consulta a serviço de CEP via HTTP GET
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
    categoria: "Integrações e Web",
    sintaxe: "HttpPost( <cUrl>, [<cParams>], <cPostData>, [<nTimeout>], [<aHeaders>], [@<cHeaderRet>] )",
    retorno: "Caractere (Corpo da resposta HTTP do servidor)",
    descricaoCurta: "Executa uma requisição HTTP do tipo POST enviando dados no corpo da mensagem.",
    descricaoDetalhada: "Função nativa de envio de dados para APIs REST e web services externos. Suporta envio de payloads JSON, XML e formulários com cabeçalhos customizados.",
    parametros: [
      { nome: "cUrl", tipo: "Caractere", descricao: "URL do endpoint de destino.", opcional: false },
      { nome: "cParams", tipo: "Caractere", descricao: "Parâmetros adicionais de URL.", opcional: true },
      { nome: "cPostData", tipo: "Caractere", descricao: "Conteúdo textual enviado no corpo (Body) da requisição.", opcional: false },
      { nome: "nTimeout", tipo: "Numérico", descricao: "Tempo limite em segundos (padrão: 30).", opcional: true },
      { nome: "aHeaders", tipo: "Array", descricao: "Cabeçalhos HTTP adicionais (ex: Authorization).", opcional: true },
      { nome: "cHeaderRet", tipo: "Caractere", descricao: "Variável por referência que receberá os cabeçalhos de retorno.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Envio de pedido via API REST com HTTP POST
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
    categoria: "Integrações e Web",
    sintaxe: "FWJsonSerialize( <xObjeto>, [<lCompact>], [<lEscaped>] )",
    retorno: "Caractere (String JSON formatada)",
    descricaoCurta: "Serializa um objeto, array ou HashMap do ADVPL para uma cadeia de caracteres no formato JSON.",
    descricaoDetalhada: "Componente oficial moderno do Protheus para geração de JSON. Transforma estruturas de dados em texto JSON padronizado com alta performance, essencial para construção de endpoints REST.",
    parametros: [
      { nome: "xObjeto", tipo: "Objeto / Array / HashMap", descricao: "Estrutura de dados a serializar.", opcional: false },
      { nome: "lCompact", tipo: "Lógico", descricao: "Se .T., gera JSON compacto sem quebras de linha (padrão: .T.).", opcional: true },
      { nome: "lEscaped", tipo: "Lógico", descricao: "Escapa caracteres especiais automaticamente (padrão: .T.).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Geração de JSON a partir de objeto ADVPL
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
    categoria: "Integrações e Web",
    sintaxe: "FWJsonDeserialize( <cJson>, @<xObjeto> )",
    retorno: "Lógico (.T. se sucesso ou .F. se JSON inválido)",
    descricaoCurta: "Converte uma string JSON em um objeto ou estrutura de dados nativa do ADVPL.",
    descricaoDetalhada: "Realiza a decodificação de texto JSON diretamente para uma variável de objeto ou array nativo, permitindo acesso imediato às propriedades (ex: oObj['nome']).",
    parametros: [
      { nome: "cJson", tipo: "Caractere", descricao: "String de texto em formato JSON.", opcional: false },
      { nome: "xObjeto", tipo: "Qualquer tipo", descricao: "Variável passada por referência (@) que receberá o objeto parseado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Parse de string JSON para objeto
User Function ExFWJsonDeserialize()
Local cPayload := '{"codigo": "0001", "status": "APROVADO"}'
Local oDados   := NIL

If FWJsonDeserialize(cPayload, @oDados)
    ConOut("Código: " + oDados["codigo"])
    ConOut("Status: " + oDados["status"])
Else
    ConOut("Erro: JSON inválido ou malformado!")
EndIf
Return`
  },
  {
    nome: "MsExecAuto",
    categoria: "Integrações e Web",
    sintaxe: "MsExecAuto( <bRotina>, [<xParam1>], [<xParam2>], ... )",
    retorno: "NIL",
    descricaoCurta: "Executa uma rotina padrão do Protheus em segundo plano de forma automática (ExecAuto).",
    descricaoDetalhada: "A ferramenta primordial de integração nativa do Protheus. Executa rotinas padrão de cadastro e movimentos (como inclusão de pedidos MATA410, notas MATA461 e clientes MATA030) validando todas as regras de negócio, tabelas SX e integridade sem interface gráfica.",
    parametros: [
      { nome: "bRotina", tipo: "Bloco de Código", descricao: "Bloco de código que invoca a rotina padrão (ex: {|x, y| MATA410(x, y)}).", opcional: false },
      { nome: "xParam1, xParam2...", tipo: "Qualquer tipo", descricao: "Parâmetros esperados pela rotina (cabeçalho, itens, opção 3: Inclusão, 4: Alteração, 5: Exclusão).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Chamada de rotina automática com controle de erro
User Function ExMsExecAuto()
Private lMsErroAuto := .F.
Private lMsHelpAuto := .T.
Local aCabec        := {}
Local aItens        := {}

// Exemplo conceitual de inclusão via ExecAuto
// MsExecAuto({|x, y, z| MATA410(x, y, z)}, aCabec, aItens, 3)

If lMsErroAuto
    ConOut("Erro na rotina automática! Consulte MostraErro().")
Else
    ConOut("Rotina automática concluída com sucesso!")
EndIf
Return`
  }
);
