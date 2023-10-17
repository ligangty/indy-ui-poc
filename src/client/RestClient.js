export const jsonGet = async function(payload){
  const response = await fetch(payload.url, {
    method: "GET",
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: payload.data ? payload.data : undefined
  });
  if(response.ok && payload.done){
    await response.json().then(data=>payload.done(data));
  }else if(!response.ok && payload.fail){
    await response.text().then(data=>{
      payload.fail(data, response.status, response.statusText);
    });
  }
};
