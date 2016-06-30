import org.codehaus.groovy.grails.commons.DefaultGrailsApplication

class BootStrap {

    def init = { servletContext ->



    }
    def destroy = {
        def defaultGrailsApplication = new DefaultGrailsApplication()

        println "In bootstrap Groovy file"

        /*defaultGrailsApplication.config.log4j.main.each{
            key->
                println "each properties : ${key}"
        }*/

        println "Printing configuration ${defaultGrailsApplication.config.log4j.main}"
    }
}
