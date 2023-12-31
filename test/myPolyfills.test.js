const expect = require("chai").expect;

const myPolyfills = require("../myPolyfills");

describe("Testing myPolyfills", () => {
  before(() => {
    myPolyfills();
  });

  describe("Testing myMap", () => {
    it("Check — wrong type", () => {
      function badFn() {
        Array.prototype.myMap.call(true, (value) => value);
      }
      expect(badFn).to.throw(TypeError);
    });

    it("Check — no callback", () => {
      function badFn() {
        [1, 2, 3].myMap();
      }
      expect(badFn).to.throw(TypeError);
    });

    it("Check — simple loop", () => {
      expect([1, 2, 3, 4].myMap((item) => item + 10)).to.deep.equal([1, 2, 3, 4].map((item) => item + 10));
    });

    it("Check — string", () => {
      expect(Array.prototype.myMap.call("test", (value) => `${value},`)).to.deep.equal(
        Array.prototype.map.call("test", (value) => `${value},`)
      );
    });

    it("Check — properties", () => {
      const arr = [1, 2, 3, 4];
      expect(arr.myMap((item, index, arr) => [item, index, arr])).to.deep.equal(
        arr.map((item, index, arr) => [item, index, arr])
      );
    });
  });

  describe("Testing mySome", () => {
    it("Check - wrong type", () => {
      function badFn() {
        Array.prototype.mySome.call("test");
      }
      expect(badFn).to.throw(TypeError);
    });
    it("Check - no callback", () => {
      function badFn() {
        [1, 2, 3].mySome();
      }
      expect(badFn).to.throw(TypeError);
    });
    it("Check — simple loop", () => {
      expect([1, 2, 3, 4].mySome((item) => item % 2 === 0)).to.deep.equal([1, 2, 3, 4].some((item) => item % 2 === 0));
    });
    it("Check — string", () => {
      expect(Array.prototype.mySome.call("12345", (item) => item % 2 === 0)).to.deep.equal(
        Array.prototype.some.call("12345", (item) => item % 2 === 0)
      );
    });
    it("Check — properties", () => {
      const arr = [1, 2, 3, 4];
      expect(arr.mySome((item, index, arr) => [item, index, arr])).to.deep.equal(
        arr.some((item, index, arr) => [item, index, arr])
      );
    });
  });

  describe("Testing myEvery", () => {
    it("Check - wrong type", () => {
      function badFn() {
        Array.prototype.myEvery.call("test");
      }
      expect(badFn).to.throw(TypeError);
    });
    it("Check - no callback", () => {
      function badFn() {
        [1, 2, 3].myEvery();
      }
      expect(badFn).to.throw(TypeError);
    });
    it("Check — simple loop", () => {
      expect([1, 2, 3, 4].myEvery((item) => item % 2 === 0)).to.deep.equal(
        [1, 2, 3, 4].every((item) => item % 2 === 0)
      );
    });
    it("Check — string", () => {
      expect(Array.prototype.myEvery.call("12345", (item) => item % 2 === 0)).to.deep.equal(
        Array.prototype.every.call("12345", (item) => item % 2 === 0)
      );
    });
    it("Check — properties", () => {
      const arr = [1, 2, 3, 4];
      expect(arr.myEvery((item, index, arr) => [item, index, arr])).to.deep.equal(
        arr.every((item, index, arr) => [item, index, arr])
      );
    });
  });

  describe("Testing myReeverse", () => {
    it("Check wrong type", () => {
      function badFn() {
        Array.prototype.myReverse.call(true);
      }
      expect(badFn).to.throw(TypeError);
    });
    it("Check null or undefined call", () => {
      function badFn() {
        Array.prototype.myReverse.call(null);
      }
      expect(badFn).to.throw(TypeError);
    });
    it("Check simple loop", () => {
      expect([1, 2, 3].myReverse()).to.deep.equal([1, 2, 3].reverse());
    });
  });

  describe("Testing myReduce", () => {
    it("Check — wrong type", () => {
      function badFn() {
        Array.prototype.myReduce.call(true, (acc, value) => acc + value);
      }
      expect(badFn).to.throw(TypeError);
    });

    it("Check — no callback", () => {
      function badFn() {
        [1, 2, 3].myreduce();
      }
      expect(badFn).to.throw(TypeError);
    });

    it("Check — sum", () => {
      const arr = [1, 2, 3, 4];
      expect(arr.myReduce((acc, value) => acc + value)).to.equal(arr.reduce((acc, value) => acc + value));
    });

    it("Check — string", () => {
      expect(
        Array.prototype.myReduce.call(
          "test",
          (acc, value) => {
            acc[value] = value + 1;
            return acc;
          },
          {}
        )
      ).to.deep.equal(
        Array.prototype.reduce.call(
          "test",
          (acc, value) => {
            acc[value] = value + 1;
            return acc;
          },
          {}
        )
      );
    });

    it("Check — properties", () => {
      expect(
        [1, 2, 3, 4].myReduce((acc, value, index, arr) => {
          acc.push([value, index, arr]);
          return acc;
        }, [])
      ).to.deep.equal(
        [1, 2, 3, 4].reduce((acc, value, index, arr) => {
          acc.push([value, index, arr]);
          return acc;
        }, [])
      );
    });
  });

  describe("Testing myFlat", () => {
    it("Check — wrong type", () => {
      function badFn() {
        Array.prototype.myFlat.call("asdfsd");
      }
      expect(badFn).to.throw(TypeError);
    });

    it("Check — without depth", () => {
      const arr = [1, 2, [3, 4, [9]]];
      expect(arr.myFlat()).to.deep.equal(arr.flat());
    });

    it("Check — depth 1", () => {
      const arr = [1, 2, [3, 4, [5, [6]], [9, 10]]];
      expect(arr.myFlat(1)).to.deep.equal(arr.flat(1));
    });

    it("Check — depth 2", () => {
      const arr = [1, 2, [3, 4, [5, 6]]];
      expect(arr.myFlat(2)).to.deep.equal(arr.flat(2));
    });

    it("Check — depth Infinity", () => {
      const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
      expect(arr.myFlat(Infinity)).to.deep.equal(arr.flat(Infinity));
    });
  });
});
