import com.ttnd.linksharing.*

class BootStrap {

    def grailsApplication

    def assetResourceLocator;

    //def filebase = null;

    def init = { servletContext ->

        //filebase = servletContext.getRealPath("/");

        createUser()
        createTopic()
        createResources()
        subscribeTopics()
        createReadingItems()
        createResourceRating()
        createAdmin()
    }

    def createUser() {

        User user1 = new User(firstName: "Seldon", lastName: "Cooper", email: "seldoncooper@gmail.com", userName: grailsApplication.config.user.username, password: grailsApplication.config.user.password, confirmPassword: grailsApplication.config.user.password, admin: false, active: true)
        User user2 = new User(firstName: "Rajesh", lastName: "Kutrapali", email: "rajeshkutrapali@gmail.com", userName: "raj", password: "12345678", confirmPassword: "12345678", admin: false, active: true)
        user1.save(flush: true, failOnError: true) ?: println("...........Error in Saving......................................")
        user2.save(flush: true, failOnError: true) ?: println("...........Error in Saving.......................................")

        println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> $User.count")
    }

    def createTopic() {

        Topic.withTransaction {

            Topic user1t1 = new Topic(name: "java1", visibility: Visibility.PRIVATE)
            Topic user1t2 = new Topic(name: "java2", visibility: Visibility.PUBLIC)
            Topic user1t3 = new Topic(name: "java3", visibility: Visibility.PUBLIC)
            Topic user1t4 = new Topic(name: "java4", visibility: Visibility.PRIVATE)
            Topic user1t5 = new Topic(name: "java5", visibility: Visibility.PRIVATE)


            Topic user2t1 = new Topic(name: "java1", visibility: Visibility.PRIVATE)
            Topic user2t2 = new Topic(name: "java2", visibility: Visibility.PUBLIC)
            Topic user2t3 = new Topic(name: "java3", visibility: Visibility.PUBLIC)
            Topic user2t4 = new Topic(name: "java4", visibility: Visibility.PRIVATE)
            Topic user2t5 = new Topic(name: "java5", visibility: Visibility.PRIVATE)



            User.get(1).addToTopic(user1t1)
                    .addToTopic(user1t2)
                    .addToTopic(user1t3)
                    .addToTopic(user1t4)
                    .addToTopic(user1t5)
                    .save(flush: true, failOnError: true) ?: println("Error to add topic")

            User.get(2).addToTopic(user2t1)
                    .addToTopic(user2t2)
                    .addToTopic(user2t3)
                    .addToTopic(user2t4)
                    .addToTopic(user2t5)
                    .save(flush: true, failOnError: true) ?: println("Error to add topic2")

        }

    }

    def createResources() {
        Topic.list().eachWithIndex { topic, index ->

            def f = "docs/exercise3.txt";

            5.times {
                // CreateLink resource

                String s = " Stylized implementation of HTML's element for abbreviations and acronyms to show the expanded version on hover. Abbreviations with a title attribute have a light dotted bottom border and a help cursor on hover, providing additional context on hover and to users of assistive technologies.";

                Link linkResource = new Link()
                String url = "http://www.xyz.com/page${it}"
                String description = "dummyLinkResource ${topic} "+s
                String title = "DummyLink${it + 1}"

                linkResource.createdBy = topic.createdBy
                linkResource.link = url
                linkResource.description = description
                linkResource.title = title
                topic.addToResources(linkResource)
                linkResource.save(flush: true, failOnError: true)

                // CreateDocument resource

                Document documentResource = new Document()
                String filePath = f
                String contentType = ".txt"
                String dDescription = "dummyDocumentResource ${topic} "+s
                String dTitle = "DummyDocuments${it + 1}"

                documentResource.createdBy = topic.createdBy
                documentResource.filepath = filePath
                documentResource.contentType = contentType
                documentResource.description = dDescription
                documentResource.title = dTitle
                topic.addToResources(documentResource)
                documentResource.save(flush: true, failOnError: true)
            }
        }

    }

    def subscribeTopics(){
        Topic.list().eachWithIndex{ topic, i ->
            User.list().each{ user->
                if(topic.createdBy!=user){
                    Subscription subscription = new Subscription(user:user,topic: topic,seriousness: Seriousness.CASUAL)
                    user.addToSubscriptions(subscription)
                    subscription.save(flush: true, failOnError: true)
                }
            }
        }
    }

    def createReadingItems() {

        User.withTransaction {

            /*println "userList ${User.list().size()}"

            User u1 = User.list().get(0);

            println "user1 ${u1}"

            println "All Subscriptions ${Subscription.list().size()}"

            println "userSubscriptions ${u1.subscriptions.size()}"*/

            User.list().each {user->
                user.getSubscriptions().each {subscription->
                    subscription.topic.resources.each {res->
                        //println "${res.createdBy} == ${user}"
                        if(res.createdBy!=user){
                            ReadingItem ri = new ReadingItem([user:user,resource: res])
                            ri.save(flush: true, failOnError: true)
                        }
                    }
                }
            }
        }
    }

    def createResourceRating(){
        ReadingItem.list().each {ritem->
            if(!ritem.isRead){
                Rating r = new Rating(createdBy: ritem.user,resource: ritem.resource,score:Math.abs(new Random().nextInt(5)+1));
                r.save(flush: true, failOnError: true)
            }
        }
    }

    def createAdmin(){
        User user1 = new User(firstName: "Vikas", lastName: "Kumar", email: "vikas.kumar@tothenew.com", userName: grailsApplication.config.admin.username, password: grailsApplication.config.admin.password, confirmPassword: grailsApplication.config.admin.password, admin: true, active: true)
        user1.save(flush: true, failOnError: true) ?: println("...........Error in Saving Admin.......................................")
    }


    def destroy = {

    }
}
