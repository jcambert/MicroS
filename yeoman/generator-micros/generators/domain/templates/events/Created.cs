using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Events
{
    public class <%= changeCase.titleCase(name)%>Created : <%= changeCase.titleCase(name)%>BaseEvent
    {
        public Guid Id { get; }

        <%props.forEach(property=>{
            %>public <%= property.type%>  <%= changeCase.titleCase(property.name)%>{get;}
        <%})%>

        public <%= changeCase.titleCase(name)%>Created(Guid id<%props.forEach(property=>{%>,<%= property.type %> <%= changeCase.lowerCase(property.name) %> <%})%>)
        {
            Id = id;
            <%props.forEach(property=>{%><%=changeCase.titleCase(property.name) %> = <%= changeCase.lowerCase(property.name) %> ;
            <%}) %>
        }
    }
}
