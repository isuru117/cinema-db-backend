/* eslint-disable no-unused-expressions */

import MovieModel from "../../src/models/movie.model.js";
import Sinon from "sinon";
import MovieService from "../../src/services/movie.service.js";
import { assert, expect } from "chai";

// perform basic unit tests for service layer

describe("Movie Controller - search tests", () => {

  let sandbox = Sinon.createSandbox();
  let query = "";

  afterEach(function () {
    sandbox.restore();
  });

  it("should return movie info on valid query", () => {

    sandbox.stub(MovieModel, "find").callsFake(() => Promise.resolve([{
      name: "movie",
      description: "movie description",
      _id: "someid",
    }]));

    return MovieService.search(query).then(result => {
      expect(result).to.be.not.null;
      expect(result.length).to.be.greaterThan(0);
    });
  });

  it("should return null info not found", () => {

    sandbox.stub(MovieModel, "find").callsFake(() => Promise.resolve([]));

    return MovieService.search(query).then(result => {
      expect(result).to.be.null;
    });
  });

  it("should throw error on data retreieving exception", () => {

    sandbox.stub(MovieModel, "find").returns(Promise.reject());

    return Promise.resolve(()=>{
      MovieService.search(query).catch(error=>{
        assert.isNotOk(error,"Promise error");
      });
    });
  });
});

describe("Movie Controller - insert tests", () => {

  let sandbox = Sinon.createSandbox();
  let body = {};

  afterEach(function () {
    sandbox.restore();
  });

  it("should return success and movie info on valid query", () => {

    sandbox.stub(MovieModel, "create").callsFake(() => Promise.resolve({
      name: "movie",
      description: "movie description",
      _id: "someid",
      status: "success",
    }));

    return MovieService.insert({}).then(result => {
      expect(result).to.be.not.null;
      expect(result.status).to.be.equal("success");
    });
  });

  it("should throw error on data insertion exception", () => {
    sandbox.stub(MovieModel, "create").throws(new Error);
    return Promise.resolve(()=>{
      MovieService.insert(body).catch(error=>{
        assert.isNotOk(error,"Promise error");
      });
    });
  });
});


