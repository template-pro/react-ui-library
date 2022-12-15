import mergeProps from "..";

describe("mergeProps", () => {
  it("should work", () => {
    expect(mergeProps({ foo: 1 }, { foo: 2 })).toEqual({ foo: 2 });
    expect(mergeProps({ foo: 1 }, { foo: 2 }, { foo: 3 })).toEqual({ foo: 3 });

    expect(mergeProps({ foo: void 0 }, { foo: 2 })).toEqual({ foo: 2 });
    expect(mergeProps({ foo: 1 }, { foo: void 0 })).toEqual({ foo: 1 });

    expect(mergeProps({ foo: 1 }, { foo: void 0 })).toEqual({ foo: 1 });

    expect(mergeProps({ foo: void 0 }, { foo: 2 })).toEqual({ foo: 2 });

    expect(
      mergeProps({ foo: 1, bar: void 0 }, { foo: void 0, bar: 2 })
    ).toEqual({
      foo: 1,
      bar: 2,
    });

    expect(mergeProps({ foo: null }, { foo: 2 })).toEqual({ foo: 2 });
    expect(mergeProps({ foo: 1 }, { foo: null })).toEqual({ foo: null });
    expect(mergeProps({ foo: 1 }, { foo: false })).toEqual({ foo: false });
    expect(mergeProps({ foo: 1 }, { foo: '' })).toEqual({ foo: '' });
    expect(mergeProps({ foo: 1 }, { foo: 0 })).toEqual({ foo: 0 });
    expect(mergeProps({ foo: 1 }, { foo: NaN })).toEqual({ foo: NaN });
  });
});
