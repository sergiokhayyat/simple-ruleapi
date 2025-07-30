const { Engine } = require('json-rules-engine');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { rules, facts } = body;

    if (!Array.isArray(rules)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '"rules" must be an array' }),
      };
    }

    if (typeof facts !== 'object' || facts === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '"facts" must be an object' }),
      };
    }

    const engine = new Engine();

    // Añadimos cada regla al engine
    rules.forEach(rule => engine.addRule(rule));

    const { events } = await engine.run(facts);

    return {
      statusCode: 200,
      body: JSON.stringify({ events }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
