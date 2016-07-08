package com.ttnd.linksharing

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import grails.test.spock.IntegrationSpec
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Rating)
@Mock([User,Topic,Link])
class RatingSpec extends Specification {


    void "Testing Resource rating should not be more than 5 and less than 1"() {
        setup:
        User u = new User(email:'vks.cool19@gmail.com',username: 'vkscool', firstName: 'Vikas', lastName: 'Kumar')
        Topic topic = new Topic(createdBy: u,name:"Topic1",visibility: Visibility.PUBLIC)
        Link l = new Link(createdBy: u,topic:topic,description: 'Sample Description',link:'https://www.xyz.com')
        Rating r = new Rating(createdBy: u,resource: l,score: exscore)
        when:
        r.validate()
        then:
        r.hasErrors()==result
        where:
        exscore|result
        0|true
        1|false
        -1|true
        6|true
        5|false
        0.5|true
        1.5|false
    }

    void "Testing user can rate only once"(){
        setup:
        User u = new User(email:'vks.cool19@gmail.com',password: "123asbdfds", username: 'vkscool', firstName: 'Vikas', lastName: 'Kumar')
        u.save()
        Topic topic = new Topic(createdBy: u,name:"Topic1",visibility: Visibility.PUBLIC)
        topic.save()
        Link l = new Link(createdBy: u,topic:topic,description: 'Sample Description',link:'https://www.xyz.com')
        l.save()
        when:
        Rating r = new Rating(createdBy: u,resource: l,score: 1)
        r.save(flush: true)
        Rating r2 = new Rating(createdBy: u,resource: l,score: 2)
        r2.save(flush:true)
        then:
        assertFalse(r.hasErrors())
        assertTrue(r2.hasErrors())
        Rating.count==1
    }
}
