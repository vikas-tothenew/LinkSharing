import com.ttnd.linksharing.User
import grails.rest.render.json.JsonRenderer

// Place your Spring DSL code here
beans = {
    userJSONRenderer(JsonRenderer, User) {
        excludes = ['password','confirmPassword']
    }
}
