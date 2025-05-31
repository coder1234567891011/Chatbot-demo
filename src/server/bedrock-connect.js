const { BedrockAgentRuntimeClient, InvokeAgentCommand} = require("@aws-sdk/client-bedrock-agent-runtime");

const bedrockClient = new BedrockAgentRuntimeClient({ region: "us-east-1" });

async function invokeAgent(message, agentId, agentAliasId, sessionId) {
  const command = new InvokeAgentCommand({
    agentId: agentId, // ← Get this from Bedrock Agent console
    agentAliasId: agentAliasId, // ← Often 'DRAFT' or your published alias
    sessionId: sessionId, // Use a UUID or keep it per user
    inputText: message
  });

  try {
    const response = await bedrockClient.send(command);
    console.log("--------------------",command,"-----------------------")
    // Convert the response stream into a single string (for simple demo)
    const decoder = new TextDecoder("utf-8");
    let result = "";

    for await (const chunk of response.completion) {
      result += decoder.decode(chunk.chunk.bytes, { stream: true });
    }

    return result;
  } catch (err) {
    console.error("Error invoking Bedrock Agent:", err);
    throw err;
  }
}

module.exports = { invokeAgent };