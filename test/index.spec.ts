import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";

import * as infra from "../index";

/**
 * Wrapper for pulumi.all that integrates with mocha asynchronously.
 *
 * @example
 * testOutputs(done, [bucket.acl], ([acl] => assert.equal(acl, "private")));
 *
 * @param {fn} done - the `done` callback provided by Mocha
 * @param {Output[]} desiredOutputs - a list of outputs whose values will be passed to `callback`
 * @param {fn} callback - takes `desiredOutputs` values as a param and executes when the values are ready
 */
export const outputs = (
    done: (message?: any) => any,
    desiredOutputs: pulumi.Output<any>[],
    callback: (o: any) => void,
) => {
    pulumi.all(desiredOutputs).apply(outputs => {
        try {
            callback(outputs);
            done();
        } catch (e) {
            done(e);
        }
    });
};

describe("univ-colorado-dlp-interview", function() {
    it("has a prefix of 'univ-colorado-dlp-interview'", function(done) {
        outputs(done, [infra.bucket.bucket], ([bucket]) => {
            assert.equal(bucket, "univ-colorado-dlp-interview");
        });
    });

    it("has a private acl", function(done) {
        outputs(done, [infra.bucket.acl], ([acl]) => {
            assert.equal(acl, "private");
        });
    });

    // FILL ME IN
    // Write a test to for Justin's s3 access.
});

describe("financial-report", function() {
    it("is named financial-report.csv", function(done) {
        outputs(done, [infra.secretDocument.key], ([key]) => {
            assert.equal(key, "notpublic/financial-report.csv");
        });
    });

    it("has content", function(done) {
        outputs(done, [infra.secretDocument.content], ([content]) => {
            assert.ok(content);
        });
    });
});

describe("website", function() {
    it("is named website.html", function(done) {
        outputs(done, [infra.publicDocument.key], ([key]) => {
            assert.equal(key, "public/website.html");
        });
    });

    it("has content", function(done) {
        outputs(done, [infra.publicDocument.content], ([content]) => {
            assert.ok(content);
        });
    });
});
