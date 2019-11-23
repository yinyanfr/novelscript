export const firstLine = scenario => ({
    chapter: Object.keys(scenario)[0],
    line: 0
})

export const getLine = (scenario, {chapter, line}) => {
    const theChapter = scenario[chapter]
    if(!theChapter) return null
    const {lines} = theChapter
    if(!lines) return null
    return lines[line]
}

export const nextChapter = (scenario, chapter) => {
    const chapters = Object.keys(scenario)
    const i = chapters.indexOf(chapter)
    if(i > -1 && i+1 < chapters.length){
        return chapters[i+1]
    }
    return null
}

export const nextLine = (scenario, {chapter, line}) => {
    const chapters = Object.keys(scenario)
    const i = chapters.indexOf(chapter)
    if(i === -1) return null
    const length = scenario[chapter].lines.length
    if(line < 0 || line >= length) return null
    if(line + 1 < length){
        return {
            chapter,
            line: line + 1
        }
    }
    const next = nextChapter(scenario, chapter)
    if(!next) return null
    return {
        chapter: next,
        line: 0
    }
}

export const getNextLine = (scenario, {chapter, line}) => getLine(scenario, nextLine(scenario, {chapter, line}))
