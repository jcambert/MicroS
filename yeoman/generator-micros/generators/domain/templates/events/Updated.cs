using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Events
{
    public class <%= changeCase.titleCase(name)%>Updated : <%= changeCase.titleCase(name)%>Created
    {
        public <%= changeCase.titleCase(name)%>Updated(Guid id<%props.forEach(property=>{%>,<%= property.type %> <%= changeCase.lowerCase(property.name) %> <%})%>) : base(id<%props.forEach(property=>{%>,<%= changeCase.lowerCase(property.name) %> <%})%>)
        {
        }
    }
}
