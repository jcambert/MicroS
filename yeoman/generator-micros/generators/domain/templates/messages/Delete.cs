using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Commands
{
    public class Delete<%= changeCase.pascalCase(name)%>: <%= changeCase.pascalCase(name)%>BaseCommand
    {
        <%if(base_entity){%>
        public override Guid Id { get; set; }
        public Delete<%= changeCase.pascalCase(name)%>(Guid id) : base()
        {
            this.Id = id;
        }
        <%}else{%>
         public Delete<%= changeCase.pascalCase(name)%>() : base(){
             //TODO SET AN ID HERE
         }
        <%}%>

    }
}