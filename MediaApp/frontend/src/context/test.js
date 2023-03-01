function number() {
  let count = 0;
  return () => {
    console.log(++count);
  };
}

const func = number();

func();
func();
func();
func();
func();

let categorues = [{ categoryId: 1, section: "b" }];
let product = [{ categoryId: 1, type: "car" }];
