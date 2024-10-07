import { expect, test,it, describe } from 'vitest'
import { formatForLineExclusions } from './formatLineExclusions'


describe(formatForLineExclusions, () => {

    it("Excludes lines correctly - 1-3", () => {
        const result = formatForLineExclusions({
            status: "ok",
            lineFrom: 1,
            lineTo: 10,
            lines: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
            "commit": "does not matter",
            "commitUrl": "does not matter",
            "owner": "does not matter",
            "path": "does not matter", 
            "repo": "does not matter"
        }, [[1,3]]);


        expect(result).toEqual([
            {
                from: 1, 
                to: 3, 
                isExclude: true
            }, 
            {
                from: 4,
                to: 10, 
                isExclude: false,

                lines: [
                    "d", "e", "f", "g", "h", "i", "j"
                ]
            }
        ]);
    });

    it("Excludes lines correctly - 4-6", () => {
        const result = formatForLineExclusions({
            status: "ok",
            lineFrom: 1,
            lineTo: 10,
            lines: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
            "commit": "does not matter",
            "commitUrl": "does not matter",
            "owner": "does not matter",
            "path": "does not matter", 
            "repo": "does not matter"
        }, [[4,6]]);


        expect(result).toEqual([
            {
                from: 1, 
                to: 3, 
                isExclude: false,

                lines: [
                    "a", "b", "c"
                ]
            }, 
            {
                from:4,
                to: 6, 
                isExclude: true,
            },
            {
                from: 7,
                to: 10, 
                isExclude: false,

                lines: [
                     "g", "h", "i", "j"
                ]
            }
        ]);


    });

    it("Excludes lines correctly - 8-10", () => {
        const result = formatForLineExclusions({
            status: "ok",
            lineFrom: 1,
            lineTo: 10,
            lines: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
            "commit": "does not matter",
            "commitUrl": "does not matter",
            "owner": "does not matter",
            "path": "does not matter", 
            "repo": "does not matter"
        }, [[8,10]]);


        expect(result).toEqual([
            {
                from: 1, 
                to: 7, 
                isExclude: false,

                lines: ["a", "b", "c", "d", "e", "f", "g"],

            }, 
            {
                from: 8,
                to: 10, 
                isExclude: true
            }
        ]);


    });

    it("Excludes lines correctly - 2-4, 6-8", () => {
        const result = formatForLineExclusions({
            status: "ok",
            lineFrom: 1,
            lineTo: 10,
            lines: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
            "commit": "does not matter",
            "commitUrl": "does not matter",
            "owner": "does not matter",
            "path": "does not matter", 
            "repo": "does not matter"
        }, [[2,4], [6,8]]);


        expect(result).toEqual([
            {
                from: 1, 
                to: 1, 
                isExclude: false,

                lines: ["a",],

            }, 
            {
                from: 2,
                to: 4, 
                isExclude: true
            },
            {
                from: 5,
                to: 5, 
                isExclude: false,

                lines: ["e"]
            },
            {
                from: 6,
                to: 8, 
                isExclude: true
            },
            {
                from: 9, 
                to: 10, 
                isExclude: false,

                lines: ["i", "j"],

            }, 
        ]);


    });


    it("Excludes lines correctly - 100-103", () => {
        const result = formatForLineExclusions({
            status: "ok",
            lineFrom: 101,
            lineTo: 110,
            lines: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
            "commit": "does not matter",
            "commitUrl": "does not matter",
            "owner": "does not matter",
            "path": "does not matter", 
            "repo": "does not matter"
        }, [[101,103]]);


        expect(result).toEqual([
            {
                from: 101, 
                to: 103, 
                isExclude: true
            }, 
            {
                from: 104,
                to: 110, 
                isExclude: false,

                lines: [
                    "d", "e", "f", "g", "h", "i", "j"
                ]
            }
        ]);
    });


    it("Excludes lines correctly - no exclusions", () => {
        const result = formatForLineExclusions({
            status: "ok",
            lineFrom: 101,
            lineTo: 110,
            lines: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
            "commit": "does not matter",
            "commitUrl": "does not matter",
            "owner": "does not matter",
            "path": "does not matter", 
            "repo": "does not matter"
        });


        expect(result).toEqual([
            {
                from: 101,
                to: 110, 
                isExclude: false,

                lines: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],

            }
        ]);
    });


})