const topic = function Topic() {
    let topicId
    let topicName
    let topicCreator
    let createdDate
}

const addTopic = (topic) => {
    return new Promise((resolve, reject) => {
        if(topic?.topicId) {
            allTopics[topic.topicId] = topic
        } else {
            reject('Invalid topic id')
        }
    })
}

const getTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        if(topicId) {
            resolve(allTopics[topicId])
        } else {
            reject('Invalid topic id')
        }
    })
}

const removeTopic = (topicId) => {
    delete allTopics[topicId]
}

let allTopics = {};

export {topic, addTopic, getTopic, removeTopic, allTopics};