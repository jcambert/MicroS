using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events
{
    public class Update<%= changeCase.pascalCase(name)%>Rejected : <%= changeCase.pascalCase(name)%>BaseRejectedEvent
    {
        public Update<%= changeCase.pascalCase(name)%>Rejected(Guid id, string reason, string code) : base(id, reason, code)
        {
        }
    }
}
