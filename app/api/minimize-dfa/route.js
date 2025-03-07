// app/api/minimize-dfa/route.js

export async function POST(req) {
    try {
      // Get the DFA data from the request
      const dfaData = await req.json();
  
      // Make a request to Flask API
      const response = await fetch("https://83502n3ua8.execute-api.us-east-1.amazonaws.com/production/minimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dfaData), // Send DFA data to Flask API
      });
  
      const minimizedDfa = await response.json();
  
      // Return minimized DFA as JSON response
      if (response.ok) {
        return new Response(JSON.stringify(minimizedDfa), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify(minimizedDfa), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: "Server error, could not connect to Flask API" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  