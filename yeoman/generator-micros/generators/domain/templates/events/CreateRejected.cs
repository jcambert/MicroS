using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events
{
    public class Create<%= changeCase.pascalCase(name)%>Rejected : <%= changeCase.pascalCase(name)%>BaseRejectedEvent
    {
        public Create<%= changeCase.pascalCase(name)%>Rejected(Guid id, string reason, string code) : base(id, reason, code)
        {
        }
    }
}
