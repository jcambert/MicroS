using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Commands
{
    public class Update<%= changeCase.pascalCase(name)%> : Create<%= changeCase.pascalCase(name)%>
    {
        public Update<%= changeCase.pascalCase(name)%>(<%if(base_entity){%>Guid id<%}%><%props.forEach((property,index)=>{%><%if(base_entity || index>0){%>,<%}%><%=property.type%> <%=changeCase.lowerCase( property.name)%> <%})%>) : base(id<%props.forEach(property=>{%>,<%=changeCase.lowerCase( property.name)%> <%})%>)
        {
        }
    }
}
