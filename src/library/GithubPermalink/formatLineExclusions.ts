
/**
 * ChatGPT generated. 
 * 
 * Got it right ~~first~~ second time, given the unit tests (and then a new unit test).
 */

type LineExclusionInput = {
    status: string;
    lineFrom: number;
    lineTo: number;
    lines: string[];
    commit: string;
    commitUrl: string;
    owner: string;
    path: string;
    repo: string;
};

type LineRange = [number, number];

type LineExclusionOutput = {
    from: number;
    to: number;
    isExclude: true
} | {
    from: number; 
    to: number; 
    isExclude: false;
    lines: Array<string>;
};

export function formatForLineExclusions(
    input: LineExclusionInput,
    exclusions: LineRange[] = []
): LineExclusionOutput[] {
    const result: LineExclusionOutput[] = [];
    let currentLine = input.lineFrom;



    for (const exclusion of exclusions) {
        const [exclusionFrom, exclusionTo] = exclusion;

        // Add lines before the exclusion, if any
        if (currentLine < exclusionFrom) {
            result.push({
                from: currentLine,
                to: exclusionFrom - 1,
                isExclude: false,
                lines: input.lines.slice(currentLine - input.lineFrom, exclusionFrom - input.lineFrom),
            });
        }

        // Add the exclusion range
        result.push({
            from: exclusionFrom,
            to: exclusionTo,
            isExclude: true,
        });

        // Move current line pointer
        currentLine = exclusionTo + 1;
    }

    // Add remaining lines after the last exclusion
    if (currentLine <= input.lineTo) {
        result.push({
            from: currentLine,
            to: input.lineTo,
            isExclude: false,
            lines: input.lines.slice(currentLine - input.lineFrom, input.lineTo - input.lineFrom + 1),
        });
    }

    return result;
}
