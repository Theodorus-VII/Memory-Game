import { describe, it, expect } from "vitest";

describe("my first vitest test", ()=>{
  it('true to be true', ()=>{
    expect(true).toBe(true);
  });
  it('false to be false', ()=>{
    expect(false).toBe(false);
  });
  
});