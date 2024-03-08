async function getNum() {
  console.log("getNum_1");
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("getNum resolve");
      resolve();
    }, 1000);
  });
  console.log("getNum_2");
}

function test() {
  console.log("test");
}

function test2() {
  console.log("test2");
}

async function mainfunction() {
  console.log("mainfunction");
  test();
  await getNum();
  test2();
}
mainfunction();
