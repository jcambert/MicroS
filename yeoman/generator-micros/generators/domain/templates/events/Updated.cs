using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events
{
    public class <%= changeCase.pascalCase(name)%>Updated : <%= changeCase.pascalCase(name)%>Created
    {
        public <%= changeCase.pascalCase(name)%>Updated(Guid id<%props.forEach(property=>{%>,<%= property.type %> <%= changeCase.lowerCase(property.name) %> <%})%>) : base(id<%props.forEach(property=>{%>,<%= changeCase.lowerCase(property.name) %> <%})%>)
        {
        }
    }
}
