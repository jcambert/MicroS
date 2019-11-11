using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Events
{
    public class Delete<%= changeCase.titleCase(name)%>Rejected : <%= changeCase.titleCase(name)%>BaseRejectedEvent
    {
        public Delete<%= changeCase.titleCase(name)%>Rejected(Guid id, string reason, string code) : base(id, reason, code)
        {
        }
    }
}
