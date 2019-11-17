using MicroS_Common.Messages;
using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events
{
    [MessageNamespace("<%= changeCase.lowerCase(name)%>s")]
    public class <%= changeCase.pascalCase(name)%>BaseRejectedEvent : BaseRejectedEvent
    {
        public <%= changeCase.pascalCase(name)%>BaseRejectedEvent(Guid id, string reason, string code) : base(id, reason, code)
        {
        }
    }
}
