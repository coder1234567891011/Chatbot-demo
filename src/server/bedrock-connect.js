const { BedrockAgentRuntimeClient, InvokeAgentCommand} = require("@aws-sdk/client-bedrock-agent-runtime");

const bedrockClient = new BedrockAgentRuntimeClient({ region: "us-east-1" });

async function invokeAgent(message) {
  const command = new InvokeAgentCommand({
    agentId: "HYXOBEMAZZ", // ← Get this from Bedrock Agent console
    agentAliasId: "5QZLFVB1SS", // ← Often 'DRAFT' or your published alias
    sessionId: "session-1", // Use a UUID or keep it per user
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