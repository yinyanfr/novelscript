import Util from "./util"

/**
 * backforward compatibility
 */
class ScenarioUtil {
    scenario = []

    constructor(scenario){
        this.scenario = scenario || []
    }

    firstLine = scenario => Util.firstLine(scenario)
    getLine = ({chapter, line}) => Util.getLine(this.scenario, {chapter, line})
    nextChapter = (chapter) => Util.nextChapter(this.scenario, chapter)
    nextLine = ({chapter, line}) => Util.nextLine(this.scenario, {chapter, line})
    getNextLine = ({chapter, line}) => Util.getNextLine(this.scenario, {chapter, line})

    link = (name, args) => Util[name](this.scenario, args)
}

export default ScenarioUtil
