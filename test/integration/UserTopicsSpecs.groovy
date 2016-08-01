import com.ttnd.linksharing.Topic
import com.ttnd.linksharing.User
import grails.test.spock.IntegrationSpec

/**
 * Created by ttnd on 21/7/16.
 */
class UserTopicsSpecs extends IntegrationSpec{


    def "getUserSubscribedTopics"(){

        setup:
            User u = User.findById(1);
        when:
            List<Topic> topics = u.getsubscribedTopics();
        then:
            topics.size()>0;
    }
}
