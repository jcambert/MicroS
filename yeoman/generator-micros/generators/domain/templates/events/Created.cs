using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events
{
    public class <%= changeCase.pascalCase(name)%>Created : <%= changeCase.pascalCase(name)%>BaseEvent
    {
        public Guid Id { get; }

        <%props.forEach(property=>{
            %>public <%= property.type%>  <%= changeCase.pascalCase(property.name)%>{get;}
        <%})%>

        public <%= changeCase.pascalCase(name)%>Created(Guid id<%props.forEach(property=>{%>,<%= property.type %> <%= changeCase.lowerCase(property.name) %> <%})%>)
        {
            Id = id;
            <%props.forEach(property=>{%><%=changeCase.pascalCase(property.name) %> = <%= changeCase.lowerCase(property.name) %> ;
            <%}) %>
        }
    }
}
