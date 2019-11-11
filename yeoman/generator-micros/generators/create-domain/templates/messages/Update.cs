using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Commands
{
    public class Update<%= changeCase.titleCase(name)%> : Create<%= changeCase.titleCase(name)%>
    {
        public Update<%= changeCase.titleCase(name)%>(Guid id<%props.forEach(property=>{%>,<%=property.type%> <%=changeCase.lowerCase( property.name)%> <%})%>) : base(id<%props.forEach(property=>{%>,<%=changeCase.lowerCase( property.name)%> <%})%>)
        {
        }
    }
}
